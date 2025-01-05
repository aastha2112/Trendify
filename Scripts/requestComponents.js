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
let closeModal = document.getElementById("closeModal");
export const displayDataInCard = (arr, cont, displayAddCartBtn, quantity) => {
  arr.map((el) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let productImg = document.createElement("img");
    productImg.src = el.imageUrl;
    let nameAndWishlistDiv = document.createElement("div");
    nameAndWishlistDiv.classList.add("nameAndWishlistDiv");

    let productName = document.createElement("h3");
    productName.textContent = el.name;
    productName.style.fontSize = "1.3rem";
    productName.style.color = "black";

    let cardContDiv = document.createElement("div");
    cardContDiv.classList.add("cardContDiv");

    let discount = document.createElement("h4");
    discount.textContent = ` ${Math.round(Math.random() * 100)}% off`;
    discount.style.color = "gray";
    let productPrice = document.createElement("h2");
    productPrice.textContent = `$ ${el.price}`;
    productPrice.style.color = "black";

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
        addToWishlistBtn.classList.add("wishBtnClicked");
        setTimeout(() => {
          addToWishlistBtn.classList.remove("wishBtnClicked");
        }, 300);
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
    addTocartBtn.classList.add("addToCartBtn");
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
        addTocartBtn.classList.add("addBtnClicked");
        setTimeout(() => {
          addTocartBtn.classList.remove("addBtnClicked");
        }, 300);
        if (productAlreadyInCart.find((el) => el == elm)) {
          return;
        } else {
          user[0].cart.map((prod) => {
            prod.stock = 1;
          });
          const updatedCart = [el, ...user[0].cart];

          patchData(`${userUrl}/${user[0].id}`, { cart: updatedCart });
        }
      }
    });
    let quantityCounterDiv = document.createElement("div");
    quantityCounterDiv.classList.add("quantityCounterDiv");

    let quantityCount = document.createElement("h3");
    quantityCount.id = "quantityCount";

    quantityCount.textContent = 1;
    let increment = document.createElement("button");
    increment.textContent = "+";
    let decrement = document.createElement("button");
    decrement.textContent = "-";

    increment.addEventListener("click", async () => {
      quantityCount.textContent++;
      let userLoginInfo = JSON.parse(localStorage.getItem("userLoginTrendify"));

      let users = await getData(userUrl).then((users) => users);
      let user = users.filter((user) => user.email == userLoginInfo.email)[0];

      let cartItem = user.cart.find((item) => item.name === el.name);
      if (cartItem) {
        if (parseInt(cartItem.stock) > quantityCount.textContent) {
          cartItem.stock = quantityCount.textContent;

          await patchData(`${userUrl}/${user.id}`, { cart: user.cart });
        } else {
          quantityCount.textContent = cartItem.stock;
          return;
        }
      }
    });

    decrement.addEventListener("click", async () => {
      if (quantityCount.textContent == 1) {
        return;
      } else {
        quantityCount.textContent--;
        let userLoginInfo = JSON.parse(
          localStorage.getItem("userLoginTrendify")
        );
        if (el.stock > quantityCount.textContent) {
          let users = await getData(userUrl).then((users) => users);

          let user = users.filter(
            (user) => user.email == userLoginInfo.email
          )[0];
          el.stock = quantityCount.textContent;
          const updatedStock = quantityCount.textContent;
          patchData(`${userUrl}/${user.id}`, { stock: updatedStock });
        }
      }
    });

    productImg.addEventListener("click", () => openModal(el));

    closeModal.addEventListener("click", () => {
      document.getElementById("productModal").style.display = "none";
    });
    window.addEventListener("click", (e) => {
      const productModal = document.getElementById("productModal");
      if (e.target === productModal) {
        productModal.style.display = "none";
      }
    });
    quantityCounterDiv.append(decrement, quantityCount, increment);
    quantityCounterDiv.style.display = quantity ? "flex" : "none";

    cardContDiv.append(productPrice, discount, quantityCounterDiv);
    card.append(productImg, nameAndWishlistDiv, cardContDiv, addTocartBtn);

    cont.append(card);
  });
};
//card modal

function openModal(obj) {
  const productModal = document.getElementById("productModal");
  document.getElementById("modalImage").src = obj.imageUrl;
  document.getElementById("modalName").textContent = obj.name;
  document.getElementById("modalPrice").textContent = `$${obj.price}`;
  document.getElementById("modalDescription").textContent = obj.description;
  const moreDetailsContainer = document.getElementById("modalMoreDetails");
  moreDetailsContainer.innerHTML = `
  <h4>Additional Details</h4>
  <p>Category: ${obj.category}</p>
  <p>Rating: ${obj.rating}</p>
  <p>Stock: ${obj.stock}</p>
`;
  productModal.style.display = "block";
}

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
