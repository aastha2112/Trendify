import { userUrl } from "./urls.js";

export const getData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log("error in get request", error);
  }
};

export const displayDataInCard = (arr, cont, displayAddCartBtn) => {
  arr.map((el) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let productImg = document.createElement("img");
    productImg.src = el.imageUrl;
    let nameAndWishlistDiv = document.createElement("div");
    nameAndWishlistDiv.classList.add("nameAndWishlistDiv");

    let productName = document.createElement("h3");
    productName.textContent = el.name;
    let cardContDiv = document.createElement("div");
    cardContDiv.classList.add("cardContDiv");

    let discount = document.createElement("h4");
    discount.textContent = ` ${Math.round(Math.random() * 100)}% off`;
    discount.style.color = "gray";
    let productPrice = document.createElement("h2");
    productPrice.textContent = `$ ${el.price}`;

    let addToWishlistBtn = document.createElement("button");
    addToWishlistBtn.classList.add("fa-solid", "fa-heart", "wishlistBtn");
    nameAndWishlistDiv.append(productName, addToWishlistBtn);
    addToWishlistBtn.addEventListener("click", async () => {
      let userLoginInfo = JSON.parse(localStorage.getItem("userLoginTrendify"));
      if (userLoginInfo === null) {
        window.location.href = "login.html";
      } else {
        let users = await getData(userUrl).then((users) => users);

        let user = users.filter((user) => user.email == userLoginInfo.email);
        let alreadyWislisted = user[0].wishlist.filter(
          (elm) => elm.name === el.name
        );
        if (alreadyWislisted.find((elm) => elm == elm)) {
          return;
        } else {
          const updatedWishlist = [el, ...user[0].wishlist];

          patchData(`${userUrl}/${user[0].id}`, { wishlist: updatedWishlist });
        }
      }
    });

    let addTocartBtn = document.createElement("button");
    addTocartBtn.textContent = "Add To Cart!";
    addTocartBtn.style.display = displayAddCartBtn ? "flex" : "none";
    addTocartBtn.addEventListener("click", async () => {
      //add shopping bag functionality
      let userLoginInfo = JSON.parse(localStorage.getItem("userLoginTrendify"));
      if (userLoginInfo === null) {
        window.location.href = "login.html";
      } else {
        let users = await getData(userUrl).then((users) => users);

        let user = users.filter((user) => user.email == userLoginInfo.email);
        let productAlreadyInCart = user[0].cart.filter(
          (elm) => elm.name === el.name
        );
        if (productAlreadyInCart.find((elm) => elm == elm)) {
          return;
        } else {
          const updatedCart = [el, ...user[0].cart];

          patchData(`${userUrl}/${user[0].id}`, { cart: updatedCart });
        }
      }
    });

    cardContDiv.append(productPrice, discount);
    card.append(productImg, nameAndWishlistDiv, cardContDiv, addTocartBtn);
    cont.append(card);
  });
};

//url without id

export const postData = async (url, content) => {
  try {
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(content),
    });
  } catch (error) {
    console.log("error in post request", error);
  }
};

//url with id
export const patchData = async (url, content) => {
  try {
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(content),
    });
  } catch (error) {
    console.log("error in patch request", error);
  }
};

//url with id
export const deleteData = async (url) => {
  try {
    fetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("error in delete request", error);
  }
};
