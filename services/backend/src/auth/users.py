from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from tortoise.exceptions import DoesNotExist
from validate_docbr import CPF, PIS
from src.database.models import Users
from src.schemas.users import UserDatabaseSchema

cpf = CPF()
pis = PIS()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user(username: str):
    if cpf.validate(username):
        return await UserDatabaseSchema.from_queryset_single(Users.get(cpf=username))
    elif pis.validate(username):
        return await UserDatabaseSchema.from_queryset_single(Users.get(pis=username))
    else:
        return await UserDatabaseSchema.from_queryset_single(Users.get(email=username))


async def validate_user(user: OAuth2PasswordRequestForm = Depends()):
    try:
        db_user = await get_user(user.username)
    except DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    return db_user
