var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});


// const cartIcon = document.querySelector('.cart-icon');
// const cartTab = document.querySelector('.cart-tab');

// cartIcon.addEventListener('click',()=>{
//     cartTab.classList.add('cart-tab-active')
// });


if (!document.querySelector('.cart-tab')) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-tab">
      <h3>Your Cart</h3>
      <div class="cart-list"></div>
      <div class="total-container">
        <h4>Total:</h4>
        <h4 class="cart-total">$0.00</h4>
      </div>
      <div class="btn-container flex gap-2">
        <a href="#" class="btn close-btn">Close</a>
        <a href="#" class="btn">Check out</a>
      </div>
    </div>
  `);
}


const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');

if (cartIcon && cartTab) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartTab.classList.add('cart-tab-active');
    });
}


if (closeBtn && cartTab) {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartTab.classList.remove('cart-tab-active');
    });
}




let productList = [];
let cartProduct=[];
const showCards = () => {
    productList.forEach(product => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
           <div class="card-image">
          <img src="${product.image}" >
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn card-btn">Add to Cart</a>
        `

        cardList.appendChild(orderCard);

        const cardBtn = orderCard.querySelector('.card-btn');

        cardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product);
        });
    });
}


const addToCart = (product) => {

    const existingProduct = cartProduct.find(item => 
        item.id === product.id
    );
    if(existingProduct){
        alert("Item already in our cart!!");
        return;
    }

    cartProduct.push(product);
    let quantity = 1;


    const cartItem = document.createElement('div');
    cartItem.classList.add('item');

    cartItem.innerHTML = `
     <div class="item-image">
     <img src="${product.image}">
     </div>
     <div class="item-details">
     <h4 class="product">${product.name}</h4>
     <h4 class="item-total">${product.price}</h4>
     </div>
     <div class="item-quantity">
     <a href="#" class="quantity-btn minus">
     <i class="fa-solid fa-minus"></i>
     </a>
    <h4 class="quantity-value">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
    <i class="fa-solid fa-plus"></i>
   </a>
   </div>
    `;

    cartList.appendChild(cartItem);

    const plusBtn = cartItem.querySelector('.plus');
    const quantityValue = cartItem.querySelector('.quantity-value');
    plusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        quantity++;
        quantityValue.textContent = quantity;
    });

     const plusBtn1 = cartItem.querySelector('.minus');
    const quantityValue1 = cartItem.querySelector('.quantity-value');
    plusBtn1.addEventListener('click',(e)=>{
        e.preventDefault();
        quantity--;
        quantityValue1.textContent = quantity;
    })
}




const initApp = () => {

    fetch('products.json').then
        (response => response.json()).then
        (data => {

            productList = data;
            showCards();
        })
}
initApp();

