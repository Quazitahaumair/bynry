from django.urls import path
from .views import UserCreateView  # Import the view

urlpatterns = [
    path('users/', UserCreateView.as_view(), name='user-create'),
    path('create_ticket/', UserCreateView.as_view(), name='fbsjhdbfsj'),

]