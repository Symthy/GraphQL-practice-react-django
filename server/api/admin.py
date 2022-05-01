from django.contrib import admin

# Register your models here.
from api.models import Employee, Department

admin.site.register(Employee)
admin.site.register(Department)
