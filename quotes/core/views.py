# Create your views here.

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import *
from .serializers import *


class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [{"name": detail.name, "detail": detail.detail} 
                  for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


# Program: all days with timeline
class ProgramView(generics.ListAPIView):
    queryset = ConferenceDay.objects.all().order_by("date")
    serializer_class = ConferenceDaySerializer


# Participants
class ParticipantListView(generics.ListCreateAPIView):
    queryset = Participant.objects.all().order_by("name")
    serializer_class = ParticipantSerializer


class ParticipantDetailView(generics.RetrieveAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer


# Abstracts
class AbstractListView(generics.ListCreateAPIView):
    queryset = Abstract.objects.all().order_by("title")
    serializer_class = AbstractSerializer


class AbstractDetailView(generics.RetrieveAPIView):
    queryset = Abstract.objects.all()
    serializer_class = AbstractSerializer


# Talks (optional endpoints)
class TalkListView(generics.ListAPIView):
    queryset = Talk.objects.all().order_by("day", "start_time")
    serializer_class = TalkSerializer


class TalkDetailView(generics.RetrieveAPIView):
    queryset = Talk.objects.all()
    serializer_class = TalkSerializer


class OrganizerListAPIView(generics.ListAPIView):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer


class OrganizingCommitteeListAPIView(generics.ListAPIView):
    queryset = OrganizingCommittee.objects.all()
    serializer_class = OrganizingCommitteeSerializer


# Admin Panel - JWT
class AdminPanelView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({
            "message": "Welcome to admin panel",
            "user": request.user.username
        })

# Публичная форма регистрации
class SubmissionCreateView(generics.CreateAPIView):
    queryset = ParticipantSubmission.objects.all()
    serializer_class = ParticipantSubmissionSerializer
    permission_classes = [AllowAny]

# Админ: список всех заявок
class SubmissionListView(generics.ListAPIView):
    queryset = ParticipantSubmission.objects.all()
    serializer_class = ParticipantSubmissionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            return ParticipantSubmission.objects.filter(status=status_filter)
        return ParticipantSubmission.objects.all()