from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "users" ADD "cpf" VARCHAR(14) NOT NULL;
        ALTER TABLE "users" ADD "pis" VARCHAR(14) NOT NULL;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "users" DROP COLUMN "cpf";
        ALTER TABLE "users" DROP COLUMN "pis";"""
