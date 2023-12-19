function toggleFavorite(productId) {
    var box = document.getElementById(productId);
    var favoriteButton = box.querySelector('.favorite');
    var favoriteIcon = document.createElement('span');
    favoriteIcon.className = 'favorite-icon';
    favoriteIcon.innerHTML = '❤️';

    if (!favoriteButton.classList.contains('favorited')) {
      favoriteButton.classList.add('favorited');
      favoriteButton.appendChild(favoriteIcon);
    } else {
      favoriteButton.classList.remove('favorited');
      favoriteButton.removeChild(favoriteIcon);
    }
  }

  function addToCart(productId) {
    // Add your logic to handle adding to the cart
    console.log('Product added to cart:', productId);
  }