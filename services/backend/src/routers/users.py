from fastapi import HTTPException
from passlib.context import CryptContext
from tortoise.exceptions import DoesNotExist, IntegrityError

from src.database.models import Users
from src.schemas.users import UserOutSchema


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_user(user) -> UserOutSchema:
    user.password = pwd_context.encrypt(user.password)

    try:
        user_obj = await Users.create(**user.dict(exclude_unset=True))
    except IntegrityError:
        raise HTTPException(status_code=401, detail=f"Erro ao criar usuário!")

    return await UserOutSchema.from_tortoise_orm(user_obj)


async def delete_user(user_id, current_user):
    try:
        db_user = await UserOutSchema.from_queryset_single(Users.get(id=user_id))
    except DoesNotExist:
        raise HTTPException(
            status_code=404, detail=f"Usuário {user_id} não encontrado!")

    if db_user.id == current_user.id:
        deleted_count = await Users.filter(id=user_id).delete()
        if not deleted_count:
            raise HTTPException(
                status_code=404, detail=f"Usuário {user_id} não encontrado!")
        return f"Usuário {user_id} excluído!"

    raise HTTPException(
        status_code=403, detail=f"Não autorizado excluir usuário!")
