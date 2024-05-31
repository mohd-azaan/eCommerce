    // Initialize cart from localStorage or create a new one
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    DisplayCart();
    updateCartCount();
    // Function to update the cart count display
    function updateCartCount() {
        document.getElementById('cart').innerHTML = `Cart(${Object.keys(cart).length})`;
    }

    // Update cart count on page load
    document.addEventListener('DOMContentLoaded', function() {
        updateCartCount();
        DisplayCart();
    });

    // Add to Cart button click handler
    $(document).on('click', '.atc', function() {
        let id = $(this).attr('id');
        let title = document.getElementById('nm' + id).innerHTML;
        let price = parseFloat(document.getElementById('price' + id).innerHTML);
        let image = document.getElementById('img' + id).src;

        console.log(image)
        if (!cart[id]) {
            cart[id] = { 'quantity': 1, 'title': title, 'price': price, 'image':image };
        } else {
            cart[id]['quantity'] += 1;
            cart[id]['price'] += price;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        DisplayCart();
    });

    function DisplayCart() {
        let cartString = '<h5>This is your Cart</h5>';
        let cartIndex = 1;
        let cartKeys = Object.keys(cart);
        for (let id of cartKeys) {
            let cartItem = cart[id];
            cartString += `<div>${cartIndex}. ${cartItem['title']} - Qty: ${cartItem['quantity']} - Total Price: ₹${cartItem['price']}</div>`;
            cartIndex += 1;
        }
        cartString += '<a href="/checkout" class="btn btn-warning" id="checkout">Checkout</a>';
        document.getElementById('cart').setAttribute('data-content', cartString);

        // Re-initialize popover after updating the content
        $('[data-toggle="popover"]').popover('dispose').popover();
    }


    let totalString = '';
    // Function to display cart items
    let total = 0;
    function displayCartItems() {
        for (item in cart) {
            let name = cart[item]['title'];
            let quantity = cart[item]['quantity'];
            let price = cart[item]['price'];
            let image = cart[item]['image']; // Assuming 'image' contains the image filename
            total += cart[item]['price']
            let itemString = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <img src="${image}" alt="${name}" class="card" style="width: 50px; height: 50px; margin-right: 10px;">
              <div class="flex-grow-1">
                <h5 class="mb-1">${name}</h5>
                <small class="text-muted">Quantity: ${quantity}</small>
              </div>
              <span class="badge badge-warning badge-pill">₹${price}</span>
            </li>`;
            $('#item_list').append(itemString);
        }
        totalString = `<li class="list-group-item d-flex justify-content-between align-items-center"><b>Your Total:</b> <b>₹   ${total}</b> </li>`;
        $('#item_list').append(totalString);
    }
    
    // Display cart items on page load
    displayCartItems();
    $('#total').val(total);
    // Store the cart data in a hidden input field for form submission
    $('#items').val(JSON.stringify(cart));
    