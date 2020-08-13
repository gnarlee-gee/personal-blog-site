from django.contrib import admin
from .models import Post # from our models.py file import Post model

# Register your models here.
# Allows blog post entries to be accessible from admin area
admin.site.register(Post)
