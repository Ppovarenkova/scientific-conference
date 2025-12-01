from django.contrib import admin
from .models import ConferenceDay, Session, Talk, Participant, Abstract, Organizer, OrganizingCommittee


class TalkInline(admin.TabularInline):
    model = Talk
    extra = 1
    fields = ("title", "talk_type", "participant", "abstract", "start_time", "end_time")
    ordering = ("start_time",)


class SessionInline(admin.TabularInline):
    model = Session
    extra = 1
    fields = ("chair", "start_time", "end_time")
    ordering = ("start_time",)




@admin.register(ConferenceDay)
class ConferenceDayAdmin(admin.ModelAdmin):
    list_display = ("date",)
    ordering = ("date",)
    inlines = [SessionInline, TalkInline]  # everything in one place


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ("day", "chair", "start_time", "end_time")
    list_filter = ("day", "chair")
    inlines = [TalkInline]


@admin.register(Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ("title", "talk_type", "get_participant_name", "start_time", "end_time", "session", "day")
    list_filter = ("talk_type", "session", "day")
    search_fields = ("title", "participant__name", "abstract__title")

    def get_participant_name(self, obj):
        return obj.participant.name if obj.participant else None

    get_participant_name.short_description = "Participant"


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ("name", "affiliation", "email")
    search_fields = ("name",)


@admin.register(Abstract)
class AbstractAdmin(admin.ModelAdmin):
    list_display = ("title", "authors")
    search_fields = ("title", "authors")

@admin.register(Organizer)
class OrganizerAdmin(admin.ModelAdmin):
    list_display = ("name", "department", "email")
    search_fields = ("name", "department")

@admin.register(OrganizingCommittee)
class OrganizingCommitteeAdmin(admin.ModelAdmin):
    list_display = ("name", "department", "email")
    search_fields = ("name", "department")  