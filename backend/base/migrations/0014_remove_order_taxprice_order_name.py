# Generated by Django 4.2 on 2023-05-26 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_orderitem_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='taxPrice',
        ),
        migrations.AddField(
            model_name='order',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
