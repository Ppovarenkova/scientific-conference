from django.db import models

# Create your models here.

class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)

class ConferenceDay(models.Model):
    date = models.DateField()

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return str(self.date)


class ConferenceDay(models.Model):
    date = models.DateField()

    def __str__(self):
        return str(self.date)


class Session(models.Model):
    day = models.ForeignKey(ConferenceDay, related_name="sessions", on_delete=models.CASCADE)
    chair = models.CharField(max_length=255, blank=True)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.day} | {self.chair or 'Session'}"


class Talk(models.Model):
    session = models.ForeignKey(Session, related_name="talks", on_delete=models.CASCADE)
    speaker = models.CharField(max_length=255)
    title = models.TextField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.speaker}: {self.title[:30]}"