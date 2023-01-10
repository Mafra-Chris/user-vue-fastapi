from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel
from src.database.models import Users
from typing import Optional

UserInSchema = pydantic_model_creator(
    Users, name="UserIn", exclude_readonly=True
)
UserOutSchema = pydantic_model_creator(
    Users, name="UserOut", exclude=["password", "created_at", "modified_at"]
)
UserDatabaseSchema = pydantic_model_creator(
    Users, name="User", exclude=["created_at", "modified_at"]
)


class UpdateUser(BaseModel):
    name = Optional[str]
    email = Optional[str]
    country = Optional[str]
    state = Optional[str]
    city = Optional[str]
    zipcode = Optional[str]
    street = Optional[str]
    home_number = Optional[str]
    address_complement = Optional[str]
    password = Optional[str]
