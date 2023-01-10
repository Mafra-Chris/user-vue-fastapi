from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "users" ALTER COLUMN "address_complement" TYPE TEXT USING "address_complement"::TEXT;
        ALTER TABLE "users" ALTER COLUMN "address_complement" TYPE TEXT USING "address_complement"::TEXT;
        ALTER TABLE "users" ALTER COLUMN "address_complement" TYPE TEXT USING "address_complement"::TEXT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "users" ALTER COLUMN "address_complement" TYPE VARCHAR(255) USING "address_complement"::VARCHAR(255);
        ALTER TABLE "users" ALTER COLUMN "address_complement" TYPE VARCHAR(255) USING "address_complement"::VARCHAR(255);
        ALTER TABLE "users" ALTER COLUMN "address_complement" TYPE VARCHAR(255) USING "address_complement"::VARCHAR(255);"""
