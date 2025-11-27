from rest_framework import serializers
from .models import *
from datetime import time


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']


class TalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = "__all__"


class SessionSerializer(serializers.ModelSerializer):
    talks = TalkSerializer(many=True)

    class Meta:
        model = Session
        fields = ["id", "chair", "start_time", "end_time", "talks"]


class TimelineItemSerializer(serializers.Serializer):
    """
    Универсальный объект таймлайна:
      - либо энергетика (break/event)
      - либо session-блок
    """
    type = serializers.CharField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    data = serializers.JSONField()

class ConferenceDaySerializer(serializers.ModelSerializer):
    timeline = serializers.SerializerMethodField()

    class Meta:
        model = ConferenceDay
        fields = ["id", "date", "timeline"]

    def get_timeline(self, day):
        timeline = []

        # 1) добавляем standalone breaks/events
        for item in Talk.objects.filter(day=day, session__isnull=True):
            timeline.append({
                "type": item.talk_type,  # break или event
                "start_time": item.start_time,
                "end_time": item.end_time,
                "data": TalkSerializer(item).data
            })

        # 2) добавляем session как БЛОК
        for session in day.sessions.all():
            timeline.append({
                "type": "session",
                "start_time": session.start_time,
                "end_time": session.end_time,
                "data": SessionSerializer(session).data
            })

        # 3) сортировка ВСЕГО СМЕШАННОГО списка
        timeline.sort(key=lambda x: x["start_time"])

        return timeline