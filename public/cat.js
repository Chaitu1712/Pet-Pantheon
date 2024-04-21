document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.product button');
  
    cartButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const productInfo = {
          name: button.parentNode.querySelector('h3').textContent,
          price: button.parentNode.querySelector('p').textContent.replace('Rs. ', ''),
            quantity: 1,
            img:button.parentNode.querySelector('img').src
        };
        fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productInfo)
        })
          .then(response => {
            if (response.ok) {
              console.log('Product added to cart successfully');
            } else {
              console.error('Failed to add product to cart');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    });
  });