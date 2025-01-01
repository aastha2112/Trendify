let navBar = document.querySelector(".navBar");
let navModalCont = document.querySelector(".navModalCont");

function createNavbar() {
  let logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src = "./Assets/trend_ify.png";
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  //category div
  let categories = document.createElement("div");
  categories.classList.add("categoryDiv");

  //login search form div
  let loginAndsearch = document.createElement("div");
  loginAndsearch.classList.add("loginAndsearchDiv");
  let loginForm = document.createElement("a");
  loginForm.href = "login.html";
  loginForm.classList.add("loginForm");

  loginForm.textContent = "Login";

  let searchBtn = document.createElement("button");
  searchBtn.classList.add("fa", "fa-search");

  let shoppingBag = document.createElement("button");
  shoppingBag.classList.add("fa-solid", "fa-bag-shopping");

  //appending
  loginAndsearch.append(loginForm, searchBtn, shoppingBag);
  navBar.append(logo, categories, loginAndsearch);

  // categories
  const categoriesToBeDisplayed = [
    {
      name: "New Arrivals",
      links: [{ text: "All New Arrivals", url: "/Trendify/newArrivals.html" }],
    },
    {
      name: "Clothing",
      links: [
        { text: "Men", url: "/Trendify/mensClothing.html" },
        { text: "Women", url: "/Trendify/womenClothing.html" },
        { text: "Kids", url: "/Trendify/kidClothing.html" },
      ],
    },
    {
      name: "Shoes",
      links: [
        { text: "Boots", url: "/Trendify/shoes.html" },
        { text: "Heels", url: "/Trendify/shoes.html" },
        { text: "Sneakers", url: "/Trendify/shoes.html" },
      ],
    },
    {
      name: "Accessories",
      links: [
        { text: "Bags", url: "/Trendify/accessory.html" },
        { text: "Belts", url: "/Trendify/accessory.html" },
        { text: "Hats", url: "/Trendify/accessory.html" },
      ],
    },
    {
      name: "Beauty",
      links: [
        { text: "Skincare", url: "/Trendify/home.html" },
        { text: "Makeup", url: "/Trendify/home.html" },
        { text: "Haircare", url: "/Trendify/home.html" },
      ],
    },
    {
      name: "Home",
      links: [
        { text: "Decor", url: "/Trendify/home.html" },
        { text: "Bedding", url: "/Trendify/home.html" },
        { text: "Kitchenware", url: "/Trendify/home.html" },
      ],
    },
  ];
  categoriesToBeDisplayed.forEach((category) => {
    const container = document.createElement("div");
    container.classList.add("modalContainer");
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("categoryLink");
    const modal = document.createElement("div");
    modal.classList.add("modal");

    category.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.textContent = link.text;
      modal.appendChild(anchor);
    });
    button.addEventListener("mouseover", () => {
      modal.style.display = "block";
    });

    modal.addEventListener("mouseover", () => {
      modal.style.display = "block";
    });
    button.addEventListener("mouseout", (event) => {
      if (!modal.contains(event.relatedTarget)) {
        modal.style.display = "none";
      }
    });

    modal.addEventListener("mouseout", (event) => {
      if (!button.contains(event.relatedTarget)) {
        modal.style.display = "none";
      }
    });
    container.appendChild(button);
    container.appendChild(modal);

    // Append container to categoryDiv
    categories.appendChild(container);
  });
}

createNavbar();

function openModal() {
  let navModal = document.createElement("div");
  navModal.classList.add("navModal");

  let allNew = document.createElement("a");
  let trending = document.createElement("div");
  let imgLinkCont = document.createElement("div");

  allNew.textContent = "All New";

  let trendingHeading = document.createElement("h3");
  trendingHeading.textContent = "Trending";
  let winter = document.createElement("a");
  let boots = document.createElement("a");
  let hairAcs = document.createElement("a");

  winter.textContent = "Winter Essentials";
  boots.textContent = "Leather Boots";
  hairAcs.textContent = "Hair Accessories";

  trending.append(trendingHeading, winter, boots, hairAcs);

  navModal.append(allNew, trending, imgLinkCont);
  navModalCont.append(navModal);
}
