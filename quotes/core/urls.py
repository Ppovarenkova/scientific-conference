from django.urls import path
from .views import ProgramView

urlpatterns = [
    path("program/", ProgramView.as_view(), name="program"),
]