from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Ticket

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'role', 'is_staff', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('email',)
    ordering = ('email',)  # Updated ordering to use 'email' instead of 'username'
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('role', 'is_staff', 'is_active', 'is_superuser')}),
        ('Groups', {'fields': ('groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role', 'is_staff', 'is_active', 'is_superuser')}
        ),
    )

admin.site.register(User, CustomUserAdmin)

admin.site.register(Ticket)  # Register the Ticket model
