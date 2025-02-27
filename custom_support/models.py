from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
from django.conf import settings


# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


# Custom User Model
class User(AbstractUser):
    username = None  # Remove the username field
    email = models.EmailField(unique=True, primary_key=True)  # Use email as primary key
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('agent', 'Agent'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')

    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


# Ticket Model
class Ticket(models.Model):
    service_type = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=50, default='Open')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service_type} - {self.status}"
