from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ticket

User = get_user_model()

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Create user with hashed password
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

# Ticket Serializer
class TicketSerializer(serializers.ModelSerializer):
    # Accept email directly instead of user ID
    user = serializers.EmailField(required=False)

    class Meta:
        model = Ticket
        fields = ['id', 'user', 'service_type', 'description', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        email = validated_data.pop('user', None)
        user = None
        if email:
            user = User.objects.filter(email=email).first()
        
        ticket = Ticket.objects.create(user=user, **validated_data)
        return ticket       

    

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        role = validated_data['role']

        user = User.objects.create_user(email=email, password=password, role=role)
        return user
