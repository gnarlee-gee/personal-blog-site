# Generated by Django 3.1.3 on 2020-12-05 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20201205_1240'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='slug_title',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(default='', editable=False, unique=True),
        ),
    ]
