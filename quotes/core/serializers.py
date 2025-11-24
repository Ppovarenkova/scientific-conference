from rest_framework import serializers
from .models import *
from .models import ConferenceDay, Session, Talk

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']


class TalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = ("id", "speaker", "title", "start_time", "end_time")


class SessionSerializer(serializers.ModelSerializer):
    talks = TalkSerializer(many=True)

    class Meta:
        model = Session
        fields = ("id", "chair", "start_time", "end_time", "talks")


class ConferenceDaySerializer(serializers.ModelSerializer):
    sessions = SessionSerializer(many=True)

    class Meta:
        model = ConferenceDay
        fields = ("date", "sessions")