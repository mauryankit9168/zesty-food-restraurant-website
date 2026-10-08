from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username="root",
    password="1408@ank.in#",
    host="localhost",
    port=3306,
    database="zestyfood"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()