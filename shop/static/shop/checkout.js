if (localStorage.getItem('cart') == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}
let totalString = '';
// Function to display cart items
function displayCartItems() {
    let total = 0;
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
// Store the cart data in a hidden input field for form submission
$('#items').val(JSON.stringify(cart));
