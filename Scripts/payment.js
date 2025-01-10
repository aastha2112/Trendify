import {
  deleteData,
  displayDataInCard,
  getData,
  patchData,
  postData,
} from "./requestComponents.js";
import { userUrl } from "./urls.js";

let orderSummary = document.getElementById("orderSummary");
let totalPayableAmount = document.getElementById("totalPayableAmount");
let payBtn = document.getElementById("payBtn");
let container = document.getElementById("container");
async function displaySummary() {
  try {
    let userLoginInfo = JSON.parse(localStorage.getItem("userLoginTrendify"));

    let users = await getData(userUrl).then((users) => users);
    let user = users.filter((user) => user.email == userLoginInfo.email)[0];
    let userCart = await getData(`${userUrl}/${user.id}`).then(
      (users) => users
    );
    console.log(userCart);

    userCart.cart.map((el) => {
      console.log(el.name);
      let product = document.createElement("div");
      let productName = document.createElement("h4");
      productName.classList.add("productName");
      let productPrice = document.createElement("h4");
      productPrice.classList.add("productPrice");

      productName.textContent = el.name;
      productPrice.textContent = `$ ${el.price}`;
      product.append(productName, productPrice);
      orderSummary.append(product);
    });

    let cartValue = userCart.cart.reduce((acc, el) => {
      acc += el.price;

      return acc;
    }, 0);
    totalPayableAmount.textContent = `$ ${cartValue + 10}`;

    payBtn.addEventListener("click", async () => {
      let cardHoldername = document.getElementById("cardHoldername");
      let cardNum = document.getElementById("cardNum");
      let month = document.getElementById("month");
      let year = document.getElementById("year");
      let cvv = document.getElementById("cvv");

      if (!cardHoldername.value) {
        alert("Invalid Card Holder Name!");
      } else if (!cardNum.value) {
        alert("Invalid Card Number");
      } else if (month.value == "noMonth") {
        alert("Invalid Month!");
      } else if (year.value == "noYear") {
        alert("Invalid Year!");
      } else if (cvv.value.length !== 3) {
        alert("Invalid CVV");
      } else {
        if (cardNum.value.length !== 16) {
          alert("Invalid Card number");
        } else {
          await patchData(`${userUrl}/${user.id}`, { cart: [] });
          //   container.style.display = "none";
          setTimeout(() => {
            container.textContent = "Order Placed! Thanks for shopping!";
            container.style.fontSize = "3rem";
            container.style.color = "blue";
          }, 2000);

          setTimeout(() => {
            window.location.href = "index.html";
          }, 4000);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
displaySummary();
