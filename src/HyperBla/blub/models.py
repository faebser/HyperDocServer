from django.db import models

# Create your models here.

class TagManager(models.Manager):
    def get_by_natural_key(self, title):
        return self.get(title=title)
    
class Tag(models.Model):
    title   = models.CharField(max_length = 200)
    def __unicode__(self):
        return self.title
    def natural_key(self):
        return (self.title)
    
class Mess(models.Model):
    text    = models.CharField(max_length = 200)
    date    = models.DateTimeField("date created")
    tags    = models.ManyToManyField(Tag)
    def __unicode__(self):
        return self.text