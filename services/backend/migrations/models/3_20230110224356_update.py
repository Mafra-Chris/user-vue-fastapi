from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE UNIQUE INDEX "uid_users_pis_fcbd09" ON "users" ("pis");
        CREATE UNIQUE INDEX "uid_users_cpf_3f9b98" ON "users" ("cpf");"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "idx_users_cpf_3f9b98";
        DROP INDEX "idx_users_pis_fcbd09";"""
