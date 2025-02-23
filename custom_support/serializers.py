from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()  # Use the custom User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Create a new user with a hashed password."""
        return User.objects.create_user(**validated_data)
