const isAuth = localStorage.getItem('user');

if (!isAuth) {
    window.location.href = '/';
}

const restaurant = 'tanuki';

const cardsMenu = document.querySelector('.cards-menu');



const changeHeadingInfo = ( restaurant ) => {
    const title = document.querySelector('.restaurant-title');
    const rating = document.querySelector('.rating');
    const minPrice = document.querySelector('.price');
    const category = document.querySelector('.category');

    title.textContent = restaurant.name;
    rating.textContent = restaurant.stars;
    minPrice.textContent = `От ${restaurant.price}`;
    category.textContent = restaurant.kitchen;
}

const renderItems = ( data ) => {
    data.forEach( ( { id, name, description, price, image } ) => {
        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
        `

        cardsMenu.append(card);
    });
}

const restaurantData = localStorage.getItem('restaurant');

if ( restaurantData ) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));

    changeHeadingInfo(restaurant);

    fetch(`./db/${restaurant.products}`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data);
    })
    .catch((error) => {
        console.log(error);
    })
} else {
    window.location.href = '/';
}
