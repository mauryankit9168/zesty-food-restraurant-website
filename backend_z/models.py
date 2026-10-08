from sqlalchemy import Column, Integer, String, Float
from database import Base


class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    price = Column(Float, nullable=False)
    category = Column(String(100))
    image = Column(String(500))


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    items = Column(String(5000), nullable=False)

    subtotal = Column(Float, nullable=False)
    discount = Column(Float, default=0)
    delivery_fee = Column(Float, default=2)

    amount = Column(Float, nullable=False)

    status = Column(String(50), default="Pending")