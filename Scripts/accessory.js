import { displayDataInCard, getData } from "./requestComponents.js";
import { productUrl } from "./urls.js";

let accessCont = document.querySelector(".accessCont");
let sortByPrice = document.querySelector("#sortByPrice");
async function accessoryPage() {
  try {
    let data = await getData(productUrl).then((arr) => arr);
    let acces = data.filter((el) => el.category === "Bags and Accessories");
    console.log(acces);
    displayDataInCard(acces, accessCont, true);

    sortByPrice.addEventListener("change", () => {
      accessCont.innerHTML = "";
      if (sortByPrice.value == "htl") {
        acces.sort((a, b) => b.price - a.price);

        displayDataInCard(acces, accessCont, true);
      } else if (sortByPrice.value == "lth") {
        acces.sort((a, b) => a.price - b.price);

        displayDataInCard(acces, accessCont, true);
      }
    });
  } catch (error) {
    console.log(error, "Accessory problem");
  }
}

window.onload = accessoryPage();
