"""home_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
# from blog import views # from . import views is the alternative -- this is more readable imo
from .views import HomeView, PostDetailView # using class based views so we need to use class based URLs


urlpatterns = [
    #path('', views.home, name='home'),
    path('', HomeView.as_view(), name='home'), # .as_view() because class based views
    path('post/<int:pk>', PostDetailView.as_view(), name='post-detail') # pk is the primary key -> auto assigns to post in db
]
