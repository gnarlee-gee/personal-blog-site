from django.shortcuts import render
# ListView allows us to list a query set in the db... lists all the posts
# DetailView brings back one record from db... 1 blog post
# ListView -> gets all blog posts, click on one goes to DetailView
from django.views.generic import ListView, DetailView
from .models import Post

# Create your views here.
# def home(request):
#     return render(request, 'home.html', {})

class HomeView(ListView):
    model = Post
    template_name = 'home.html'
    
class PostDetailView(DetailView):
    model = Post
    template_name = 'post_details.html'
    