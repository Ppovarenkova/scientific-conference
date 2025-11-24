from django.contrib import admin
from .models import ConferenceDay, Session, Talk

# Register your models here.

class TalkInline(admin.TabularInline):
    model = Talk
    extra = 1
    fields = ("speaker", "title", "start_time", "end_time")
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
    inlines = [SessionInline]


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ("day", "chair", "start_time", "end_time")
    list_filter = ("day", "chair")
    inlines = [TalkInline]


@admin.register(Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ("speaker", "title", "session", "start_time", "end_time")
    search_fields = ("speaker", "title")