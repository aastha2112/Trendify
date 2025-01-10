import {
  deleteData,
  displayDataInCard,
  getData,
  patchData,
  postData,
} from "./requestComponents.js";
import { userUrl } from "./urls.js";

let shoppingBag = document.getElementById("shoppingBag");
let cartValueText = document.querySelector(".cartValueText");
let checkout = document.getElementById("checkout");
async function displayShoppingBag() {
  try {
    let userLoginInfo = JSON.parse(localStorage.getItem("userLoginTrendify"));
    if (userLoginInfo === null) {
      window.location.href = "login.html";
    } else {
      let users = await getData(userUrl).then((users) => users);
      let user = users.filter((user) => user.email == userLoginInfo.email);
      displayDataInCard(user[0].cart, shoppingBag, false, true, true);

      let userCart = await getData(`${userUrl}/${user[0].id}`).then(
        (users) => users
      );

      if (userCart.cart.length == 0) {
        shoppingBag.textContent = "Your Bag is Empty!";
        shoppingBag.classList.add("afterCheckout");
        shoppingBag.style.display = "flex";

        cartValueText.textContent = `Total Cart Value : $ 0`;
      } else {
        let cartValue = userCart.cart.reduce((acc, el) => {
          acc += el.price;

          return acc;
        }, 0);

        cartValueText.textContent = `Total Cart Value : $ ${cartValue}`;
      }

      checkout.addEventListener("click", async () => {
        if (userCart.cart.length == 0) return;
        else {
          setTimeout(() => {
            window.location.href = "payment.html";
            shoppingBag.classList.add("afterCheckout");
            shoppingBag.style.display = "flex";
          }, 2000);
        }
      });
    }
  } catch (error) {
    console.log(error, "cart error");
  }
}
displayShoppingBag();
