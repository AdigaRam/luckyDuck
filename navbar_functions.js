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
        meatButton.style.backgroundColor = "gray";
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
        vegetarianButton.style.backgroundColor = "gray";
        cardsContainer.innerHTML = "";
        createCards();
    }
}

// Remove allergic dishes from the menu

function removeAllergic() {
    if (allergyButton.value === "laktos") {
        allergyButton.style.backgroundColor = "gray";
        filterByLactos = true;
        filterByGluten = false;
        cardsContainer.innerHTML = "";
        createCards();
    } else if (allergyButton.value === "gluten") {
        allergyButton.style.backgroundColor = "gray";
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
        priceSortButton.style.backgroundColor = "gray";
        sortAscending();
    } else if (priceSortButton.value === "fallande") {
        priceSortButton.style.backgroundColor = "gray";
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
    let x = shoppingList.length;
    shoppingList.push(getMenu()[cardNumber]);
    // Add the property (number) to shoppingList with the same cardNumber to help
    // removing red border from the card in the function deleteListItem(cardNumber)
    shoppingList[x].number = cardNumber;
    const card = document.querySelector(".card-" + cardNumber);
    card.style.border = "5px solid red";
    cartItemsCounter++;
    counter.innerHTML = cartItemsCounter;
}
console.log(shoppingList);

function openShoppingCart() {
    cartList.innerHTML = "";
    cartPopup.classList.add("openPopup");
    shoppingList.forEach((item, index) => createCartItem(index));
    countTotalPrice();
    totalPrice.innerHTML = countTotalPrice() + " KR";
}

function closeShoppingCart() {
    cartPopup.classList.remove("openPopup");
    cartList.innerHTML = "";
    if (cartItemsCounter === 0) {
        counter.innerHTML = "";
    }
}

function countTotalPrice() {
    let sum = 0;
    shoppingList.forEach((item) => sum += item.price);
    return sum;
}

function deleteListItem(cardNumber) {
    const card = document.querySelector(".card-" + shoppingList[cardNumber].number);
    //To check if there is more than one of the same dish
    let z = 0;
    shoppingList.forEach((item) => {
        if (shoppingList[cardNumber].number === item.number) z++;
    });
    // If there is no more than one dish => remove red border
    if (z < 2) {
        card.style.border = "0";
    }
    delete shoppingList[cardNumber];
    openShoppingCart();
    cartItemsCounter--;
    counter.innerHTML = cartItemsCounter;
}
