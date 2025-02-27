from django.http import HttpResponse
from django.urls import path
from .views import UserCreateView, TicketCreateView, TicketListView, LoginView


# Home view function
def home_view(request):
    return HttpResponse("Welcome to the API Home Page!")

# URL patterns
urlpatterns = [
    path('', home_view, name='home'),  
    path('users/', UserCreateView.as_view(), name='user-create'),
    path('tickets/', TicketListView.as_view(), name='ticket-list'),       # Updated to 'ticket-list'
    path('tickets/create/', TicketCreateView.as_view(), name='ticket-create'),  # Updated to 'ticket-create'
    path('login/', LoginView.as_view(), name='login'),
    # path('createUser/', UserCreateView.as_view(), name='create_user'),


]
