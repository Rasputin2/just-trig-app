from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
