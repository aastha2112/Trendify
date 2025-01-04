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
      displayDataInCard(user[0].cart, shoppingBag, false, true);

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
        setTimeout(() => {
          cartValueText.textContent = `Total Cart Value : $ 0`;
          shoppingBag.textContent = "Order Placed! Thanks for Shopping.";
          shoppingBag.classList.add("afterCheckout");
          shoppingBag.style.display = "flex";
        }, 2000);
        await patchData(`${userUrl}/${user[0].id}`, { cart: [] });
      });
    }
  } catch (error) {
    console.log(error, "cart error");
  }
}
displayShoppingBag();
