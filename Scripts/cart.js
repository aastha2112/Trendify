import { displayDataInCard, getData, postData } from "./requestComponents.js";
import { userUrl } from "./urls.js";

let shoppingBag = document.getElementById("shoppingBag");

async function displayShoppingBag() {
  try {
    let userLoginInfo = JSON.parse(localStorage.getItem("userLoginTrendify"));
    if (userLoginInfo === null) {
      window.location.href = "login.html";
    } else {
      let users = await getData(userUrl).then((users) => users);
      let user = users.filter((user) => user.email == userLoginInfo.email);
      console.log(user);
      displayDataInCard(user[0].wishlist, shoppingBag);
    }
  } catch (error) {
    console.log(error, "wishlist error");
  }
}
displayShoppingBag();
