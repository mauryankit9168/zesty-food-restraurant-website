from pydantic import BaseModel


class FoodCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    category: str
    image: str | None = None


class FoodResponse(FoodCreate):
    id: int

    class Config:
        from_attributes = True


class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class OrderCreate(BaseModel):
    items: dict
    subtotal: float
    discount: float = 0
    delivery_fee: float = 2
    amount: float


class OrderResponse(BaseModel):
    id: int
    user_id: int
    items: dict
    subtotal: float
    discount: float
    delivery_fee: float
    amount: float
    status: str