from django.db import models
from django.contrib.auth.models import User
from pagedown.widgets import AdminPagedownWidget
from datetime import datetime
from django.utils.text import slugify
import datetime
# Note, if you add another field when you already have fields filled
# make sure to run makemigrations and migrate!

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255, null=True)
    
    # on_delete will delete all posts by admin IF we delete that admin
    body = models.TextField(null=True)
    
    date = models.DateField(auto_now_add=False, null=True)
    slug = models.SlugField(editable=False, unique=True, null=True)
    
    class Meta:
        ordering = ['-pk']

    def __str__(self):
        '''
        Shows post's title and author on admin page
        '''
        return self.title

    def save(self, *args, **kwargs):
        value = self.title
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)