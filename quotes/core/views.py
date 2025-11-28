# Create your views here.

from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from rest_framework import generics
from .serializers import *
from .serializers import ConferenceDaySerializer


# Create your views here.

class ReactView(APIView):
  
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [ {"name": detail.name,"detail": detail.detail} 
        for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)
        
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



    