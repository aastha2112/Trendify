import { getData, displayDataInCard } from "./requestComponents.js";
import { productUrl } from "./urls.js";

let kidsClothing = document.querySelector(".kidsClothing");
let menClothing = document.querySelector(".menClothing");
let womenClothing = document.querySelector(".womenClothing");

let sortByPrice = document.querySelector("#sortByPrice");

function checkClothingPage() {
  const currentPath = window.location.pathname.toLowerCase();

  if (currentPath.includes("mensclothing.html")) {
    mensPage();
  } else if (currentPath.includes("womenclothing.html")) {
    womenPage();
  } else if (currentPath.includes("kidclothing.html")) {
    kidsPage();
  } else {
    console.log("No matching page found.");
  }
}

async function mensPage() {
  try {
    let data = await getData(productUrl).then((arr) => arr);
    let menClothes = data.filter((el) => el.category === "Men's Clothing");
    displayDataInCard(menClothes, menClothing, true);

    sortByPrice.addEventListener("change", () => {
      menClothing.innerHTML = "";
      if (sortByPrice.value == "htl") {
        menClothes.sort((a, b) => b.price - a.price);

        displayDataInCard(menClothes, menClothing, true);
      } else if (sortByPrice.value == "lth") {
        menClothes.sort((a, b) => a.price - b.price);

        displayDataInCard(menClothes, menClothing, true);
      }
    });
  } catch (error) {
    console.log(error, "mens problem");
  }
}

async function womenPage() {
  try {
    let data = await getData(productUrl).then((arr) => arr);
    let womenClothes = data.filter((el) => el.category === "Women's Clothing");
    displayDataInCard(womenClothes, womenClothing, true);

    sortByPrice.addEventListener("change", () => {
      womenClothing.innerHTML = "";
      if (sortByPrice.value == "htl") {
        womenClothes.sort((a, b) => b.price - a.price);

        displayDataInCard(womenClothes, womenClothing, true);
      } else if (sortByPrice.value == "lth") {
        womenClothes.sort((a, b) => a.price - b.price);

        displayDataInCard(womenClothes, womenClothing, true);
      }
    });
  } catch (error) {
    console.log(error, "women problem");
  }
}

async function kidsPage() {
  try {
    console.log("function chala");
    let data = await getData(productUrl).then((arr) => arr);
    let kidsClothes = data.filter((el) => el.category === "Kids' Wear");
    displayDataInCard(kidsClothes, kidsClothing, true);

    sortByPrice.addEventListener("change", () => {
      kidsClothing.innerHTML = "";
      if (sortByPrice.value == "htl") {
        kidsClothes.sort((a, b) => b.price - a.price);

        displayDataInCard(kidsClothes, kidsClothing, true);
      } else if (sortByPrice.value == "lth") {
        kidsClothes.sort((a, b) => a.price - b.price);

        displayDataInCard(kidsClothes, kidsClothing, true);
      }
    });
  } catch (error) {
    console.log(error, "kids problem");
  }
}

window.onload = checkClothingPage;
