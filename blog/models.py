from django.db import models
from django.contrib.auth.models import User
from pagedown.widgets import AdminPagedownWidget
from datetime import datetime  
# Note, if you add another field when you already have fields filled
# make sure to run makemigrations and migrate!





# print(timezone.now)

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    
    # field for our html <title>
    title_tag = models.CharField(max_length=255, default="")

    # on_delete will delete all posts by admin IF we delete that admin
    author = models.ForeignKey(User, on_delete=models.CASCADE) 
    body = models.TextField()
    
    date = models.DateField(auto_now_add=False)
    
    class Meta:
        ordering = ['-date']

    def __str__(self):
        '''
        Shows post's title and author on admin page
        '''
        return self.title + ' | ' + str(self.author)
    
