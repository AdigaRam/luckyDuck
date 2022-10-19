const meatButton = document.getElementById("meatBtn");
const vegetarianButton = document.getElementById("vegetarianBtn");
const allergyButton = document.getElementById("allergyBtn");
const priceSortButton = document.getElementById("prisordningBtn");
const stigandeBtn = document.getElementById("stigandeBtn");

// Show dishes with meat when pressing (kött) button
function showMeat() {
    if (filterByMeat) {
        filterByMeat = false;
        meatButton.style.backgroundColor = "white";
        cardsContainer.innerHTML = "";
        createCards();
    } else {
        filterByMeat = true;
        filterByVegetarian = false;   // To disable (Vegetarian) button if it is enabled
        meatButton.style.backgroundColor = "red";
        vegetarianButton.style.backgroundColor = "white";   // To show that (Vegetarian) button is disabled
        cardsContainer.innerHTML = "";
        createCards();
    }
}


// Show vegetarian dishes when pressing (Vegetarisk) button

function showVegetarian() {
    if (filterByVegetarian) {
        filterByVegetarian = false;
        vegetarianButton.style.backgroundColor = "white";
        cardsContainer.innerHTML = "";
        createCards();
    } else {
        filterByVegetarian = true;
        filterByMeat = false;   // To disable (Kött) button if it is enabled
        meatButton.style.backgroundColor = "white"; // To show that (Kött) button is disabled
        vegetarianButton.style.backgroundColor = "red";
        cardsContainer.innerHTML = "";
        createCards();
    }
}

// Remove allergic dishes from the menu

function removeAllergic() {
    if (allergyButton.value === "laktos") {
        allergyButton.style.backgroundColor = "red";
        filterByLactos = true;
        filterByGluten = false;
        cardsContainer.innerHTML = "";
        createCards();
    } else if (allergyButton.value === "gluten") {
        allergyButton.style.backgroundColor = "red";
        filterByGluten = true;
        filterByLactos = false;
        cardsContainer.innerHTML = "";
        createCards();
    } else {
        allergyButton.style.backgroundColor = "white";
        filterByLactos = false;
        filterByGluten = false;
        cardsContainer.innerHTML = "";
        createCards();
    }
}

// Sort the dishes in either descending or ascending price order.

function sortAscending() {
    cardsContainer.innerHTML = "";
    recipes.sort((a, b) => (a.price - b.price));
    createCards();
}

function sortDescending() {
    cardsContainer.innerHTML = "";
    recipes.sort((a, b) => (b.price - a.price));
    createCards();
}

function prisordning() {
    if (priceSortButton.value === "stigande") {
        priceSortButton.style.backgroundColor = "red";
        sortAscending();
    } else if (priceSortButton.value === "fallande") {
        priceSortButton.style.backgroundColor = "red";
        sortDescending();
    } else {
        priceSortButton.style.backgroundColor = "white";
        sortAscending();
        cardsContainer.innerHTML = "";
        createCards();
    }
}

// =========== SHOPPING CART ==========

const cartPopup = document.getElementById("cartPopup");
const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");
const counter = document.getElementById("counter");
const shoppingList = [];
let cartItemsCounter = 0;

// Create card to display in cart list
function createCartItem(cardNumber) {
    const cartListItem = document.createElement("div");
    const cartItemHeader = document.createElement("div");
    const cartItemDeleteBtn = document.createElement("button");
    const cartItemTitle = document.createElement("p");
    const cartItemPrice = document.createElement("p");
    cartListItem.classList.add("cartListItem");
    cartListItem.classList.add("flex");
    cartItemDeleteBtn.classList.add("closeBtn");
    cartList.insertAdjacentElement("afterbegin", cartListItem);
    cartListItem.appendChild(cartItemHeader);
    cartItemHeader.appendChild(cartItemDeleteBtn);
    cartItemHeader.appendChild(cartItemTitle);
    cartListItem.appendChild(cartItemPrice);
    cartItemDeleteBtn.innerHTML = "&times;";
    cartItemTitle.innerHTML = shoppingList[cardNumber].title;
    cartItemPrice.innerHTML = shoppingList[cardNumber].price + " KR  ";
    cartItemDeleteBtn.setAttribute("onclick", "deleteListItem(" + cardNumber + ")");
}

// Add to cart function
function addToCart(cardNumber) {
    shoppingList.push(getMenu()[cardNumber]);
    cartItemsCounter++;
    counter.innerHTML = cartItemsCounter;
}

function openShoppingCart() {
    cartList.innerHTML = "";
    cartPopup.classList.add("openPopup");
    shoppingList.forEach((item, index)=> createCartItem(index));
    countTotalPrice();
    totalPrice.innerHTML = countTotalPrice() + " KR";
}

function closeShoppingCart() {
    cartPopup.classList.remove("openPopup");
    cartList.innerHTML = "";
    if(cartItemsCounter === 0) {
        counter.innerHTML = "";
    }
}

function countTotalPrice() {
    let sum = 0;
    shoppingList.forEach((item)=> sum += item.price);
    return sum;
}

function deleteListItem(cardNumber) {
    delete shoppingList[cardNumber];
    openShoppingCart();
    cartItemsCounter--;
    counter.innerHTML = cartItemsCounter;
}
