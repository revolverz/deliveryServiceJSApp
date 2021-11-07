const cardsRestaurants = document.querySelector('.cards-restaurants');

import { auth } from './auth.js';

const renderItems = (data) => {
    data.forEach( ( item ) => {

        const { image, kitchen, name, price, products, stars, time_of_delivery } = item;

        const tagA = document.createElement('a');

        tagA.setAttribute('href', '/restaurant.html');
        tagA.classList.add('card');
        tagA.classList.add('card-restaurant');

        tagA.dataset.products = products;

        tagA.innerHTML = `
            <img src="${image}" alt="image" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${time_of_delivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        ${stars}
                    </div>
                    <div class="price">От ${price} ₽</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        `

        tagA.addEventListener('click', (event) => {
            event.preventDefault();

            if ( localStorage.getItem('user') ) {
                localStorage.setItem('restaurant', JSON.stringify(item));

                window.location.href = '/restaurant.html';
            }
            else {
                auth();
            }
        })

        cardsRestaurants.append(tagA);
    })
}

fetch(`https://testbackend-204d3-default-rtdb.firebaseio.com/db/partners.json`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data);
    })
    .catch((error) => {
        console.log(error);
    })
