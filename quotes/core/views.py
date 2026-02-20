# Create your views here.

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

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


class SubmissionCreateView(generics.CreateAPIView):
    queryset = ParticipantSubmission.objects.all()
    serializer_class = ParticipantSubmissionSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


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


class SubmissionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ParticipantSubmission.objects.all()
    serializer_class = ParticipantSubmissionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


# Admin: publish submission
@api_view(['POST'])
def publish_submission(request, pk):
    if not request.user.is_staff:
        return Response({"error": "Admin only"}, status=403)
    
    try:
        submission = ParticipantSubmission.objects.get(pk=pk)
    except ParticipantSubmission.DoesNotExist:
        return Response({"error": "Submission not found"}, status=404)
    
    if submission.status == 'approved':
        return Response({
            "message": "Already published",
            "participant_id": submission.published_participant.id if submission.published_participant else None,
            "abstract_id": submission.published_abstract.id if submission.published_abstract else None
        }, status=200)
    
    try:
        participant, abstract = submission.publish()
        
        return Response({
            "message": "Published successfully",
            "participant_id": participant.id,
            "abstract_id": abstract.id if abstract else None,
            "participant_name": participant.name,
            "abstract_title": abstract.title if abstract else None
        }, status=200)
    except Exception as e:
        return Response({
            "error": f"Failed to publish: {str(e)}"
        }, status=500)