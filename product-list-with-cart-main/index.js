let cartCount = 0;
let orderTotal = 0;

const cartHeader = document.getElementById('hCart');
const cartContent = document.querySelector('.p-cart');
const cartImage = document.querySelector('img[alt="empty cart"]');

// Create cart section
const cartSection = document.createElement('div');
cartSection.classList.add('cart-section');

// Cart item display
const cartList = document.createElement('ul');
cartList.classList.add('cart-list');
cartSection.appendChild(cartList);

// Total display
const totalDisplay = document.createElement('p');
totalDisplay.classList.add('order-total');
totalDisplay.textContent = `Total: $0.00`;
cartSection.appendChild(totalDisplay);

// Confirm button
const confirmBtn = document.createElement('button');
confirmBtn.classList.add('confirm-btn');
confirmBtn.textContent = 'Confirm Order';
confirmBtn.style.display = 'none';
cartSection.appendChild(confirmBtn);

// Replace the original cart
cartContent.replaceWith(cartSection);

// Track items
const cartItems = {};

document.querySelectorAll('.cards').forEach(card => {
  const button = card.querySelector('.btn');
  const itemName = card.querySelector('.p-name');
  const itemImage = card.querySelector('img');
  const itemPrice = card.querySelector('.p-price');

  if (button && itemName && itemImage && itemPrice) {
    button.addEventListener('click', () => {
      const name = itemName.textContent;
      const priceValue = parseFloat(itemPrice.textContent.replace(/[^0-9.-]+/g, ''));
      const priceText = itemPrice.textContent;

      cartCount++;
      orderTotal += priceValue;
      cartHeader.textContent = `Your Cart (${cartCount})`;
      totalDisplay.textContent = `Total: $${orderTotal.toFixed(2)}`;
      confirmBtn.style.display = 'block';

      if (cartImage && cartImage.style.display !== 'none') {
        cartImage.style.display = 'none';
      }

      if (cartItems[name]) {
        cartItems[name].quantity++;
        cartItems[name].quantityElem.textContent = `x${cartItems[name].quantity}`;
      } else {
        const newItem = document.createElement('li');
        newItem.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = itemImage.src;
        img.alt = name;
        img.style.width = '50px';
        img.style.marginRight = '10px';

        const text = document.createElement('span');
        text.textContent = `${name} - ${priceText}`;
        text.style.marginRight = '10px';

        const quantity = document.createElement('span');
        quantity.textContent = 'x1';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => {
          cartCount -= cartItems[name].quantity;
          orderTotal -= priceValue * cartItems[name].quantity;
          cartHeader.textContent = `Your Cart (${cartCount})`;
          totalDisplay.textContent = `Total: $${orderTotal.toFixed(2)}`;
          newItem.remove();
          delete cartItems[name];

          if (cartCount === 0 && cartImage) {
            cartImage.style.display = 'block';
            confirmBtn.style.display = 'none';
            totalDisplay.textContent = `Total: $0.00`;
          }
        });

        newItem.appendChild(img);
        newItem.appendChild(text);
        newItem.appendChild(quantity);
        newItem.appendChild(removeBtn);
        cartList.appendChild(newItem);

        cartItems[name] = {
          quantity: 1,
          quantityElem: quantity,
          price: priceText // Store the price string, like "$9.99"
        };        
      }
    });
  }
});

// Confirm order view
confirmBtn.addEventListener('click', () => {
  // Clear existing cart section
  cartSection.innerHTML = '';

  // Confirmation message
  const confirmMsg = document.createElement('h2');
  confirmMsg.textContent = '🎉 Order Confirmed! We hope you enjoy your food!';
  cartSection.appendChild(confirmMsg);

  // Items summary
  const summaryList = document.createElement('ul');
  summaryList.classList.add('summary-list');

  for (const item in cartItems) {
    const li = document.createElement('li');
    li.textContent = `${item} x${cartItems[item].quantity}`;
    summaryList.appendChild(li);
  }

  cartSection.appendChild(summaryList);

  // Show total
  const finalTotal = document.createElement('p');
  finalTotal.classList.add('final-total');
  finalTotal.textContent = `Total: $${orderTotal.toFixed(2)}`;
  cartSection.appendChild(finalTotal);

  // New Order button
  const newOrderBtn = document.createElement('button');
  newOrderBtn.textContent = 'Start New Order';
  newOrderBtn.classList.add('confirm-btn');
  newOrderBtn.addEventListener('click', () => {
    location.reload(); // Reload page to reset cart
  });

  cartSection.appendChild(newOrderBtn);

  // Reset header
  cartHeader.textContent = `Your Cart (0)`;

  // Clear tracking
  cartCount = 0;
  orderTotal = 0;
  for (const key in cartItems) delete cartItems[key];
});

