# Create your views here.

from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
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
        
class ProgramView(APIView):
    def get(self, request):
        days = ConferenceDay.objects.all()
        data = ConferenceDaySerializer(days, many=True).data
        return Response(data)
    


    







    