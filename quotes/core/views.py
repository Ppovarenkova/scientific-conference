from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from .serializers import *
from rest_framework.generics import ListAPIView
from .models import ConferenceDay
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
        
class ProgramView(ListAPIView):
    queryset = ConferenceDay.objects.all().order_by("date")
    serializer_class = ConferenceDaySerializer