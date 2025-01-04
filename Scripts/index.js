// flashing cards banner 1

import { displayDataInCard, getData } from "./requestComponents.js";
import { productUrl } from "./urls.js";

let newArrivalsCardCont = document.getElementById("newArrivalsCardCont");
let trendingNowCardCont = document.getElementById("trendingNowCardCont");

async function homeCards() {
  try {
    let data = await getData(productUrl).then((arr) => arr);

    let mensCloth = data.filter((el) => el.category === "Men's Clothing")[2];
    let bag = data.filter((el) => el.category === "Bags and Accessories")[1];
    let shoe = data.filter((el) => el.category === "Shoes")[1];
    let womenCloth = data.filter((el) => el.category === "Women's Clothing")[2];
    let home = data.filter((el) => el.category === "Home Decor")[0];
    // new arrivals
    let newArrivalsList = [mensCloth, bag, shoe, womenCloth, home];

    displayDataInCard(newArrivalsList, newArrivalsCardCont);

    // trending now cards
    let trendingDataList = data.filter((el) => el.category === "Shoes");
    displayDataInCard(trendingDataList, trendingNowCardCont);
  } catch (error) {
    console.log(error);
    alert("Unable to display cards");
  }
}

window.onload = () => {
  homeCards();
};

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".banner-image");
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + 1) % images.length;

    images[currentIndex].classList.add("active");
  }

  images[currentIndex].classList.add("active");

  setInterval(showNextImage, 2000);
});
