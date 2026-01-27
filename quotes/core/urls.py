from django.urls import path
from .views import (
    ProgramView,
    ParticipantListView,
    ParticipantDetailView,
    AbstractListView,
    AbstractDetailView,
    TalkListView,
    TalkDetailView,
    OrganizerListAPIView,
    OrganizingCommitteeListAPIView,
    AdminPanelView,  
)

urlpatterns = [
    path("program/", ProgramView.as_view(), name="program"),
    path("participants/", ParticipantListView.as_view(), name="participant-list"),
    path("participants/<int:pk>/", ParticipantDetailView.as_view(), name="participant-detail"),
    path("abstracts/", AbstractListView.as_view(), name="abstract-list"),
    path("abstracts/<int:pk>/", AbstractDetailView.as_view(), name="abstract-detail"),
    path("talks/", TalkListView.as_view(), name="talk-list"),
    path("talks/<int:pk>/", TalkDetailView.as_view(), name="talk-detail"),
    path("organizers/", OrganizerListAPIView.as_view(), name="organizer-list"),
    path("committees/", OrganizingCommitteeListAPIView.as_view(), name="committee-list"),
    path("admin-panel/", AdminPanelView.as_view(), name="admin-panel"),  
]