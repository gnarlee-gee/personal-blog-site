from django.contrib import admin
from django.db import models
from .models import Post # from our models.py file import Post model
from .forms import PostForm
from pagedown.widgets import AdminPagedownWidget

# Register your models here.
# Allows blog post entries to be accessible from admin area
#admin.site.register(Post)
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget },
    }