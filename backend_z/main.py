from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json

from database import engine, SessionLocal
from models import Base, Food, User, Order
from schemas import (
    FoodCreate,
    FoodResponse,
    UserRegister,
    UserLogin,
    TokenResponse,
    OrderCreate,
    OrderResponse,
)
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

ORDER_STATUSES = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered"
]

app = FastAPI(title="Zesty Food API")


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables
Base.metadata.create_all(bind=engine)


# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home
@app.get("/")
def home():
    return {"message": "Zesty Food API is running"}


# Create food
@app.post("/foods", response_model=FoodResponse)
def create_food(
    food: FoodCreate,
    db: Session = Depends(get_db)
):
    new_food = Food(**food.model_dump())

    db.add(new_food)
    db.commit()
    db.refresh(new_food)

    return new_food


# Get all foods
@app.get("/foods", response_model=list[FoodResponse])
def get_foods(
    db: Session = Depends(get_db)
):
    return db.query(Food).all()


# =========================
# USER REGISTER
# =========================

@app.post("/auth/register")
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }


# =========================
# USER LOGIN
# =========================

@app.post("/auth/login", response_model=TokenResponse)
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token({
        "sub": str(existing_user.id),
        "email": existing_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@app.get("/auth/me")
def get_me(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == int(current_user["user_id"])
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }


# endpoints for orders
@app.post("/orders")
def create_order(
    order: OrderCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_order = Order(
        user_id=int(current_user["user_id"]),
        items=json.dumps(order.items),

        subtotal=order.subtotal,
        discount=order.discount,
        delivery_fee=order.delivery_fee,
        amount=order.amount,

        status="Pending"
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "subtotal": new_order.subtotal,
        "discount": new_order.discount,
        "delivery_fee": new_order.delivery_fee,
        "amount": new_order.amount,
        "status": new_order.status
    }

@app.get("/orders")
def get_my_orders(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = db.query(Order).filter(
        Order.user_id == int(current_user["user_id"])
    ).all()

    result = []

    for order in orders:
        result.append({
            "id": order.id,
            "user_id": order.user_id,
            "items": json.loads(order.items),
            "subtotal": order.subtotal,
            "discount": order.discount,
            "delivery_fee": order.delivery_fee,
            "amount": order.amount,
            "status": order.status
        })

    return result

@app.put("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    if status not in ORDER_STATUSES:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.status = status

    db.commit()
    db.refresh(order)

    return {
        "message": "Order status updated successfully",
        "order_id": order.id,
        "status": order.status
    }


#endpoints for admin to get all orders
@app.get("/admin/orders")
def get_all_orders(
    db: Session = Depends(get_db)
):
    orders = db.query(Order).all()

    result = []

    for order in orders:
        user = db.query(User).filter(
            User.id == order.user_id
        ).first()

        result.append({
            "id": order.id,
            "user_id": order.user_id,
            "user_name": user.name if user else "Unknown",
            "user_email": user.email if user else "Unknown",
            "items": json.loads(order.items),
            "subtotal": order.subtotal,
            "discount": order.discount,
            "delivery_fee": order.delivery_fee,
            "amount": order.amount,
            "status": order.status
        })

    return result
