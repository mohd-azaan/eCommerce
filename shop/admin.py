from django.contrib import admin
from shop.models import Product, Order
# Register your models here.

admin.site.site_title = 'ShoppingApp'
admin.site.index_title = 'Manage ShoppingApp'
admin.site.site_header = 'eCommerce Site'



class ProductAdmin(admin.ModelAdmin):
    def change_category_to_default(self,request,queryset):
        queryset.update(category="default")
    change_category_to_default.short_description = 'Default Category'
    list_display = ('title', 'id', 'price', 'category')
    search_fields = ('id', 'title')
    actions = ("change_category_to_default",)
    fields = ('title', 'price')
    list_editable = ('price', 'category')
    
admin.site.register(Product,ProductAdmin)
# admin.site.register(Product)
admin.site.register(Order)