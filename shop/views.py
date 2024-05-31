from django.shortcuts import render
from .models import Product, Order
from django.core.paginator import Paginator
# Create your views here.

def index(request):
	product_objects = Product.objects.all()
	#search code
	item_name = request.GET.get('item_name')
	if item_name!="" and item_name is not None:
		product_objects = Product.objects.filter(title__icontains=item_name)
		
	#pagination code
	paginator = Paginator(product_objects, 3)
	page = request.GET.get('page')
	product_objects = paginator.get_page(page)
	return render(request, 'shop/index.html', {'product_objects': product_objects})

def detail(request, product_id):
	product_object = Product.objects.get(id=product_id)
	return render(request, 'shop/detail.html', {'product_object': product_object})
	
def checkout(request):
    if request.method == 'POST':  # Use 'POST' in uppercase
        items = request.POST.get('items','')
        name = request.POST.get('name', '')  # Use 'POST' in uppercase
        email = request.POST.get('email', '')  # Use 'POST' in uppercase
        address = request.POST.get('address', '')  # Use 'POST' in uppercase
        city = request.POST.get('city', '')  # Use 'POST' in uppercase
        state = request.POST.get('state', '')  # Use 'POST' in uppercase
        zip = request.POST.get('zip', '')  # Use 'POST' in uppercase
        total = request.POST.get('total','')
        order = Order(items=items,name=name, email=email, address=address, city=city, state=state, zip=zip, total=total)
        order.save()
    return render(request, 'shop/checkout.html')
