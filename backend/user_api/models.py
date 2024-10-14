from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, name, image, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.name = name
		user.image = image
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required')
		if not password:
			raise ValueError('A password is required')
		user = self.create_user(email, password)
		user.is_staff = True
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	name = models.CharField(max_length=50, null=True, blank=True)
	image = models.ImageField(upload_to='users/', null=True, blank=True)

	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)

	USERNAME_FIELD = 'email'
	
	objects = AppUserManager()

	def __str__(self) -> str:
		return self.email
	