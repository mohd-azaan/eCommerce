# Generated by Django 4.0 on 2024-05-30 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_order_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total',
            field=models.CharField(default='100', max_length=200),
            preserve_default=False,
        ),
    ]