# Generated by Django 4.2 on 2023-06-03 12:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0020_review_createdat_alter_product_mainimg_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='createdAt',
        ),
    ]
