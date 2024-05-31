from django.db import models

# Create your models here.
class Product(models.Model):
	id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=200)
	description = models.TextField()
	price = models.FloatField()
	discount_price = models.FloatField()
	category = models.CharField(max_length=200)
	image = models.CharField(max_length=300)

	def __str__(self):
		return self.title.title()

class Order(models.Model):
    items = models.CharField(max_length=1000)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    address = models.CharField(max_length=1000)
    state = models.CharField(max_length=200)
    zip = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    total = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name.title()