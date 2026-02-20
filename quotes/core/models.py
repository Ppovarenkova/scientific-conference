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
    

class ParticipantSubmission(models.Model):
    """Заявки от участников - до публикации"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    # Информация об участнике
    name = models.CharField(max_length=255)
    email = models.EmailField()
    affiliation = models.CharField(max_length=500)
    photo = models.ImageField(upload_to='submissions/photos/', blank=True, null=True)
    
    # Информация об абстракте
    abstract_title = models.CharField(max_length=500, blank=True)
    abstract_text = models.TextField(blank=True)
    additional_authors = models.CharField(max_length=500, blank=True, help_text="Co-authors")
    additional_affiliations = models.TextField(blank=True, help_text="Affiliations of co-authors")
    
    # Даты пребывания
    arrival_date = models.DateField()
    departure_date = models.DateField()
    
    # Метаданные
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)
    admin_notes = models.TextField(blank=True, help_text="Internal notes for admins")
    
    # Связи с опубликованными данными
    published_participant = models.ForeignKey(
        'Participant', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='submission'
    )
    published_abstract = models.ForeignKey(
        'Abstract', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='submission'
    )
    
    class Meta:
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.name} - {self.abstract_title or 'No title'} ({self.status})"
    
    @property
    def stay_duration(self):
        """Длительность пребывания в днях"""
        if self.arrival_date and self.departure_date:
            return (self.departure_date - self.arrival_date).days
        return 0
    
    def publish(self):
        """Публикация: создание Participant и Abstract"""
        from django.utils import timezone
        
         # Если уже опубликовано, используем существующие записи
        if self.published_participant:
            participant = self.published_participant
        else:
            # Ищем участника по email (если email уникален и заполнен)
            if self.email:
                try:
                    participant = Participant.objects.get(email=self.email)
                    # Обновляем данные существующего участника
                    participant.name = self.name
                    participant.affiliation = self.affiliation
                    if self.photo:
                        participant.photo = self.photo
                    participant.save()
                except Participant.DoesNotExist:
                    # Создаем нового участника
                    participant = Participant.objects.create(
                        name=self.name,
                        email=self.email,
                        affiliation=self.affiliation,
                        photo=self.photo,
                    )
                except Participant.MultipleObjectsReturned:
                    # Если несколько с таким email, создаем нового
                    participant = Participant.objects.create(
                        name=self.name,
                        email=self.email,
                        affiliation=self.affiliation,
                        photo=self.photo,
                    )
            else:
                # Если email пустой, всегда создаем нового
                participant = Participant.objects.create(
                    name=self.name,
                    email=self.email,
                    affiliation=self.affiliation,
                    photo=self.photo,
                )
        
        # Создаем/обновляем абстракт (только если есть данные)
        abstract = None
        if self.abstract_title or self.abstract_text:
            # Комбинируем основного автора и доп. авторов
            all_authors = self.name
            if self.additional_authors:
                all_authors += f", {self.additional_authors}"
            
            # Комбинируем affiliations
            all_affiliations = self.affiliation
            if self.additional_affiliations:
                all_affiliations += f"\n{self.additional_affiliations}"
            
            # Проверяем, есть ли уже абстракт у этого участника
            if hasattr(participant, 'abstract') and participant.abstract:
                abstract = participant.abstract
                abstract.title = self.abstract_title or f"Presentation by {self.name}"
                abstract.text = self.abstract_text
                abstract.authors = all_authors
                abstract.department = all_affiliations
                abstract.save()
            else:
                # Создаем новый абстракт
                abstract = Abstract.objects.create(
                    participant=participant,
                    title=self.abstract_title or f"Presentation by {self.name}",
                    text=self.abstract_text,
                    authors=all_authors,
                    department=all_affiliations,
                )
        
        # Обновляем submission
        self.published_participant = participant
        self.published_abstract = abstract
        self.status = 'approved'
        self.reviewed_at = timezone.now()
        self.save()
        
        return participant, abstract
    
    def delete(self, *args, **kwargs):
        """Переопределяем удаление для очистки связанных объектов"""
        
        # Если submission был опубликован (approved), удаляем Participant и Abstract
        if self.status == 'approved':
            # Удаляем Abstract
            if self.published_abstract:
                # Также удалится связанный Talk (если есть) из-за CASCADE
                self.published_abstract.delete()
            
            # Удаляем Participant
            if self.published_participant:
                # Это также удалит Abstract если он связан через OneToOne
                self.published_participant.delete()
        
        # Удаляем фото submission
        if self.photo:
            self.photo.delete(save=False)
        
        super().delete(*args, **kwargs)