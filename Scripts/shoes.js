import { displayDataInCard, getData } from "./requestComponents.js";
import { productUrl } from "./urls.js";

let shoesCont = document.querySelector(".shoesCont");
let filterByCategory = document.getElementById("filterByCategory");
let headingText = document.querySelector(".headingText");
async function shoesPage() {
  try {
    let data = await getData(productUrl).then((arr) => arr);
    let shoes = data.filter((el) => el.category === "Shoes");
    displayDataInCard(shoes, shoesCont);

    filterByCategory.addEventListener("change", () => {
      shoesCont.innerHTML = "";
      if (filterByCategory.value == "men") {
        let menShoes = shoes.filter((el) => el.name.includes("Men"));
        console.log(menShoes);
        headingText.textContent = "Men's Shoes";
        displayDataInCard(menShoes, shoesCont);
      } else if (filterByCategory.value == "women") {
        let womenShoes = shoes.filter((el) => el.name.includes("Women"));
        headingText.textContent = "Women's Shoes";

        displayDataInCard(womenShoes, shoesCont);
      }
    });
  } catch (error) {
    console.log(error, "shoes problem");
  }
}

window.onload = shoesPage();
