# main.py
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = {
    'http://localhost:3000'
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)


class UserBase(BaseModel):
    username: str
    password: str


class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.get("/")
async def hello_world():
    return {"message", "Hello World!"}


@app.post("/user/", response_model=UserModel)
async def create_user(user: UserBase, db: db_dependency):
    db_transaction = models.User(**user.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/users", response_model=List[UserModel])
async def read_users(db: db_dependency, skip: int=0, limit: int=100):
    transactions = db.query(models.User).offset(skip).limit(limit).all()
    return transactions
# app = FastAPI()
#
# @app.get("/")
# async def root():
#     return {"message": "Hello World"}
#
# @app.post("/items/")
# async def create_item(item: Item):
#     return item
