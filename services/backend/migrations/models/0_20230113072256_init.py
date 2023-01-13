from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "country" VARCHAR(255) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "zipcode" VARCHAR(9) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "home_number" VARCHAR(255) NOT NULL,
    "address_complement" TEXT NOT NULL,
    "password" VARCHAR(128),
    "cpf" VARCHAR(14) NOT NULL UNIQUE,
    "pis" VARCHAR(14) NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
