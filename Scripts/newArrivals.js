import { getData, displayDataInCard } from "./requestComponents.js";
import { productUrl } from "./urls.js";

let newClothingArrivals = document.querySelector(".newClothingArrivals");

let filterByCategory = document.querySelector("#filterByCategory");

async function products() {
  try {
    let data = await getData(productUrl).then((arr) => arr);

    let newArrivals = data
      .filter((el) => el.category === "Men's Clothing")
      .splice(0, 3);
    let bag = data
      .filter((el) => el.category === "Bags and Accessories")
      .splice(0, 2);
    let shoe = data.filter((el) => el.category === "Shoes").splice(0, 3);
    let womenCloth = data
      .filter((el) => el.category === "Women's Clothing")
      .splice(0, 3);

    displayDataInCard(newArrivals, newClothingArrivals);
    displayDataInCard(bag, newClothingArrivals);
    displayDataInCard(shoe, newClothingArrivals);
    displayDataInCard(womenCloth, newClothingArrivals);

    filterByCategory.addEventListener("change", () => {
      newClothingArrivals.innerHTML = "";
      if (filterByCategory.value == "inClothing") {
        let inClothing = data.filter(
          (el) =>
            el.category === "Men's Clothing" ||
            el.category === "Women's Clothing" ||
            el.category === "Kids' Wear"
        );
        displayDataInCard(inClothing, newClothingArrivals);
      } else if (filterByCategory.value == "inShoes") {
        let inShoes = data.filter((el) => el.category === "Shoes");
        displayDataInCard(inShoes, newClothingArrivals);
      } else if (filterByCategory.value == "inAccessories") {
        let inAccessories = data.filter(
          (el) => el.category === "Bags and Accessories"
        );
        displayDataInCard(inAccessories, newClothingArrivals);
      }
    });
  } catch (error) {
    console.log(error, "New Clothes cannot get");
  }
}

products();
