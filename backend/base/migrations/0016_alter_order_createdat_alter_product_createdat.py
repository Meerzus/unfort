# Generated by Django 4.2 on 2023-05-26 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_remove_order_name_order_taxprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createdAt',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='createdAt',
            field=models.DateTimeField(),
        ),
    ]
