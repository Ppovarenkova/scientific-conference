from rest_framework import serializers
from .models import (
    React, ConferenceDay, Session,
    Talk, Participant, Abstract, Organizer, OrganizingCommittee, ParticipantSubmission
)


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ["name", "detail"]


class ParticipantSerializer(serializers.ModelSerializer):
    abstract_id = serializers.IntegerField(source="abstract.id", read_only=True)
    photo = serializers.ImageField(required=False, allow_null=True)


    class Meta:
        model = Participant
        fields = ["id", "name", "affiliation", "email", "abstract_id","photo"]


class AbstractSerializer(serializers.ModelSerializer):
    authors_string = serializers.CharField(source="authors")
    talk_id = serializers.IntegerField(source="talk.id", read_only=True)

    class Meta:
        model = Abstract
        fields = [
            "id",
            "title",
            "text",
            "authors_string",
            "department",
            "talk_id",
        ]


class TalkSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    abstract = AbstractSerializer(read_only=True)
    abstract_id = serializers.IntegerField(source="abstract.id", read_only=True)

    class Meta:
        model = Talk
        fields = [
            "id",
            "title",
            "talk_type",
            "start_time",
            "end_time",
            "participant",
            "abstract",
            "session",
            "day",
            "abstract_id",
        ]


class SessionSerializer(serializers.ModelSerializer):
    talks = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = ["id", "chair", "start_time", "end_time", "talks"]

    def get_talks(self, session):
        qs = session.talks.all().order_by("start_time")
        return TalkSerializer(qs, many=True).data


class TimelineItemSerializer(serializers.Serializer):
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
        items = []

        # standalone talks/breaks/events
        for t in Talk.objects.filter(day=day, session__isnull=True).order_by("start_time"):
            items.append({
                "type": t.talk_type,
                "start_time": t.start_time,
                "end_time": t.end_time,
                "data": TalkSerializer(t).data
            })

        # sessions
        for session in day.sessions.all():
            talks = session.talks.all().order_by("start_time")
            if talks.exists():
                start = talks.first().start_time
                end = talks.last().end_time
            else:
                start = session.start_time
                end = session.end_time

            if start:
                items.append({
                    "type": "session",
                    "start_time": start,
                    "end_time": end,
                    "data": SessionSerializer(session).data
                })

        items.sort(key=lambda x: x["start_time"])
        return TimelineItemSerializer(items, many=True).data
    
class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = ["id", "name", "department", "email", "photo"]

class OrganizingCommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizingCommittee
        fields = ["id", "name", "department", "email", "photo"]


class ParticipantSubmissionSerializer(serializers.ModelSerializer):
    stay_duration = serializers.ReadOnlyField()
    
    class Meta:
        model = ParticipantSubmission
        fields = [
            'id', 'name', 'email', 'affiliation', 'photo',
            'abstract_title', 'abstract_text', 
            'additional_authors', 'additional_affiliations',
            'arrival_date', 'departure_date', 'stay_duration',
            'status', 'submitted_at', 'reviewed_at', 'admin_notes',
            'published_participant', 'published_abstract'
        ]
        read_only_fields = ['submitted_at', 'reviewed_at', 'published_participant', 'published_abstract', 'stay_duration']
    
    def validate(self, data):
        # Проверка дат
        if data.get('departure_date') and data.get('arrival_date'):
            if data['departure_date'] <= data['arrival_date']:
                raise serializers.ValidationError({
                    'departure_date': 'Departure date must be after arrival date'
                })
        return data