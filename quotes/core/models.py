from django.db import models


class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)


class ConferenceDay(models.Model):
    date = models.DateField()

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return str(self.date)


class Session(models.Model):
    day = models.ForeignKey(
        ConferenceDay, related_name="sessions", on_delete=models.CASCADE
    )
    chair = models.CharField(max_length=255, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    class Meta:
        ordering = ["start_time"]

    def __str__(self):
        return f"{self.day} | {self.chair or 'Session'}"


class Participant(models.Model):
    name = models.CharField(max_length=255)
    affiliation = models.CharField(max_length=500, blank=True)
    email = models.EmailField(blank=True)
    photo = models.ImageField(upload_to="participants/", blank=True, null=True)

    def __str__(self):
        return self.name


class Abstract(models.Model):
    title = models.CharField(max_length=500)
    text = models.TextField(blank=True)
    authors = models.CharField(max_length=500, blank=True)
    department = models.CharField(max_length=255, blank=True)

    # abstract ←→ participant
    participant = models.OneToOneField(
        Participant,
        related_name="abstract",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title


class Talk(models.Model):
    TALK_TYPES = [
        ("talk", "Talk"),
        ("break", "Break"),
        ("event", "Event"),
    ]

    day = models.ForeignKey(
        ConferenceDay, related_name="items", on_delete=models.CASCADE
    )

    session = models.ForeignKey(
        Session,
        related_name="talks",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    talk_type = models.CharField(max_length=20, choices=TALK_TYPES, default="talk")

    title = models.CharField(max_length=255)

    # talk → participant
    participant = models.ForeignKey(
        Participant,
        related_name="talks",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    # talk → abstract
    abstract = models.OneToOneField(
        Abstract,
        related_name="talk",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        ordering = ["start_time"]

    def __str__(self):
        return f"{self.title} ({self.talk_type})"
    
class Organizer(models.Model):
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=500, blank=True)
    email = models.EmailField(blank=True)
    photo = models.ImageField(upload_to="organizers/", blank=True, null=True)

    def __str__(self):
        return self.name
    
class OrganizingCommittee(models.Model):
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=500, blank=True)
    email = models.EmailField(blank=True)
    photo = models.ImageField(upload_to="organizingCommittee/", blank=True, null=True)

    def __str__(self):
        return self.name