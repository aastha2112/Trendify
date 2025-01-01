let footerTag = document.getElementById("footer");

function footer() {
  // div 1
  let footerLinksDiv = document.createElement("div");
  footerLinksDiv.classList.add("footerLinksDiv");

  // div 2

  let footerLogoAndCopyrtDiv = document.createElement("div");
  footerLogoAndCopyrtDiv.classList.add("footerLogoAndCopyrtDiv");

  // 4 divs of footerLinksDiv along with items
  //   div 1.1
  let customerCareDiv = document.createElement("div");
  customerCareDiv.classList.add("customerCareDiv");

  let customerCare = document.createElement("h2");
  customerCare.textContent = "Customer Care";

  let help = document.createElement("a");
  help.textContent = "Help"; //add src to it

  let faq = document.createElement("a");
  faq.textContent = "FAQs"; //add src to it

  let returns = document.createElement("a");
  returns.textContent = "Returns"; //add src to it

  let support = document.createElement("a");
  support.textContent = "Support"; //add src to it

  customerCareDiv.append(customerCare, help, faq, returns, support);

  // div 1.2
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("infoDiv");

  let info = document.createElement("h2");
  info.textContent = "Info";

  let careers = document.createElement("a");
  careers.textContent = "Careers"; //add src to it

  let tAndC = document.createElement("a");
  tAndC.textContent = "Terms and Conditions"; //add src to it

  let privacyPolicy = document.createElement("a");
  privacyPolicy.textContent = "Privacy Policy"; //add src to it

  infoDiv.append(info, careers, tAndC, privacyPolicy);
  // div 1.3
  let shopDiv = document.createElement("div");
  shopDiv.classList.add("shopDiv");

  let shop = document.createElement("h2");
  shop.textContent = "Shop";

  let women = document.createElement("a");
  women.textContent = "Women"; //add src to it

  let men = document.createElement("a");
  men.textContent = "Men"; //add src to it

  let kids = document.createElement("a");
  kids.textContent = "Kids"; //add src to it

  let shoes = document.createElement("a");
  shoes.textContent = "Shoes"; //add src to it

  let home = document.createElement("a");
  home.textContent = "Home"; //add src to it

  let bagsAndAcc = document.createElement("a");
  bagsAndAcc.textContent = "Bags And Accessories"; //add src to it

  shopDiv.append(shop, women, men, kids, shoes, home, bagsAndAcc);
  // div 1.4
  let socialsDiv = document.createElement("div");
  socialsDiv.classList.add("socialsDiv");

  let newsletter = document.createElement("h2");
  newsletter.textContent = "Join The Newsletter";

  let newsletterDiv = document.createElement("div");
  newsletterDiv.classList.add("newsletterDiv");
  let newsletterDivForm = document.createElement("div");
  newsletterDivForm.classList.add("newsletterDivForm");

  let newsHeading = document.createElement("h3");
  newsHeading.textContent =
    "Sign up to our newsletter and stay up to date with updates on our latest arrivals, and sales.";

  let email = document.createElement("input");
  email.type = "email";
  email.placeholder = "Enter your email here.";

  let btn = document.createElement("button");
  btn.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;

  let socialMediaDiv = document.createElement("div");
  socialMediaDiv.classList.add("socialMediaDiv");

  let fb = document.createElement("button");
  fb.innerHTML = `<i class="fa-brands fa-facebook"></i>`;
  let insta = document.createElement("button");
  insta.innerHTML = `<i class="fa-brands fa-instagram"></i>`;
  let pinterest = document.createElement("button");
  pinterest.innerHTML = `<i class="fa-brands fa-pinterest"></i>`;
  let twitter = document.createElement("button");
  twitter.innerHTML = `<i class="fa-brands fa-twitter"></i>`;

  socialMediaDiv.append(fb, insta, pinterest, twitter);

  newsletterDiv.append(newsHeading, newsletterDivForm);
  newsletterDivForm.append(email, btn);
  socialsDiv.append(newsletter, newsletterDiv, socialMediaDiv);

  //div 2
  let logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src = "./Assets/TrendifyBg.png";

  let cprt = document.createElement("h2");
  cprt.innerHTML = ` &copy; 2025 Trendify India`;

  //appending
  footerLinksDiv.append(shopDiv, customerCareDiv, infoDiv, socialsDiv);
  footerLogoAndCopyrtDiv.append(logo, cprt);
  footerTag.append(footerLinksDiv, footerLogoAndCopyrtDiv);

  console.log(footerTag);
}

footer();
