from django.urls import path
from .views import (
    ProgramView,
    ParticipantListView, ParticipantDetailView,
    AbstractListView, AbstractDetailView,
    TalkListView, TalkDetailView,
)

urlpatterns = [
    path("program/", ProgramView.as_view(), name="program"),
    path("participants/", ParticipantListView.as_view(), name="participants"),
    path("participants/<int:pk>/", ParticipantDetailView.as_view(), name="participant-detail"),
    path("abstracts/", AbstractListView.as_view(), name="abstracts"),
    path("abstracts/<int:pk>/", AbstractDetailView.as_view(), name="abstract-detail"),
    path("talks/", TalkListView.as_view(), name="talks"),
    path("talks/<int:pk>/", TalkDetailView.as_view(), name="talk-detail"),
]