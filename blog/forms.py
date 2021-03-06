from django import forms
from pagedown.widgets import AdminPagedownWidget
from .models import Post

class PostForm(forms.ModelForm):
    body = forms.CharField(widget=AdminPagedownWidget())

    class Meta:
        model = Post
        fields = "__all__"