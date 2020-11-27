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
    context_object_name = 'post_list'
    slug = 'slug'
    # date = 'date|date:"Y"'

    

class PostDetailView(DetailView):
    model = Post
    slug = 'slug'
    template_name = 'post_details.html'
    def get_context_data(self, *args, **kwargs):
        context = super(PostDetailView, self).get_context_data(*args, **kwargs)
        context['post_list'] = Post.objects.all()
        return context
