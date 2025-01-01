export const getData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log("error in get request", error);
  }
};

export const displayDataInCard = (arr, cont) => {
  arr.map((el) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let productImg = document.createElement("img");
    productImg.src = el.imageUrl;

    let productName = document.createElement("h3");
    productName.textContent = el.name;
    let cardContDiv = document.createElement("div");
    cardContDiv.classList.add("cardContDiv");

    let discount = document.createElement("h4");
    discount.textContent = ` ${Math.round(Math.random() * 100)}% off`;
    discount.style.color = "gray";
    let productPrice = document.createElement("h2");
    productPrice.textContent = `$ ${el.price}`;
    cardContDiv.append(productPrice, discount);
    card.append(productImg, productName, cardContDiv);
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
