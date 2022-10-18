let popupHeader = document.querySelector(".popupHeader");
let popupPrice = document.querySelector(".popupPrice");
let popupImg = document.querySelector(".popupImg");
let popupText = document.querySelector(".popupText");

// Add content to popup menu
function addPopupContent(cardNumber) {
    popupHeader.innerHTML = getMenu()[cardNumber].title;
    popupPrice.innerHTML = getMenu()[cardNumber].price + " KR";
    popupImg.setAttribute("src", getMenu()[cardNumber].image);
    popupText.innerHTML = getMenu()[cardNumber].description;
}



//open popup menu
const POPUP = document.getElementById("popup");

function openPopup(cardNumber) {
    POPUP.classList.add("openPopup");
    addPopupContent(cardNumber);
}
// Close popup menu
function closePopup() {
    POPUP.classList.remove("openPopup");
}
