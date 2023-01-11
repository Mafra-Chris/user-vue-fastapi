from tortoise import fields, models


class Users(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255, unique=True)
    email = fields.CharField(max_length=255, unique=True)
    country = fields.CharField(max_length=255)
    state = fields.CharField(max_length=2)
    city = fields.CharField(max_length=255)
    zipcode = fields.CharField(max_length=9)
    street = fields.CharField(max_length=255)
    home_number = fields.CharField(max_length=255)
    address_complement = fields.TextField()
    password = fields.CharField(max_length=128, null=True)
    cpf = fields.CharField(max_length=14, unique=True)
    pis = fields.CharField(max_length=14, unique=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
