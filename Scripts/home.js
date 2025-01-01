import { displayDataInCard, getData } from "./requestComponents.js";
import { productUrl } from "./urls.js";

let homeCont = document.querySelector(".homeCont");
let sortByPrice = document.querySelector("#sortByPrice");
async function homeDecorPage() {
  try {
    let data = await getData(productUrl).then((arr) => arr);
    let homeDecor = data.filter((el) => el.category === "Home Decor");
    console.log(homeDecor);
    displayDataInCard(homeDecor, homeCont);

    sortByPrice.addEventListener("change", () => {
      homeCont.innerHTML = "";
      if (sortByPrice.value == "htl") {
        homeDecor.sort((a, b) => b.price - a.price);

        displayDataInCard(homeDecor, homeCont);
      } else if (sortByPrice.value == "lth") {
        homeDecor.sort((a, b) => a.price - b.price);

        displayDataInCard(homeDecor, homeCont);
      }
    });
  } catch (error) {
    console.log(error, "Home decor problem");
  }
}

window.onload = homeDecorPage();
