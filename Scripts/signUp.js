import { getData, postData } from "./requestComponents.js";
import { userUrl } from "./urls.js";

let signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    if (!signUpForm.email.value || !signUpForm.password.value) {
      return;
    }
    let data = await getData(userUrl).then((data) => data);
    let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let userAlreadyPresent = data.filter(
      (el) => el.email == signUpForm.email.value
    );

    if (userAlreadyPresent.length > 0) {
      alert("User already exists! Please Log In.");
      window.location.href = "login.html";
    } else {
      if (emailRegExp.test(signUpForm.email.value)) {
        if (signUpForm.password.value.length < 8) {
          alert("Password is too weak!");
        } else {
          userSignUp();
          alert("Sign Up Successful!");
          signUpForm.reset();
        }
      } else {
        alert("Invalid Email!");
        return;
      }
    }
  } catch (error) {
    console.log(error);
    alert("Sorry! Unable to signup.");
  }
});

function userSignUp() {
  let userObj = {
    username: signUpForm.username.value,
    email: signUpForm.email.value,
    password: signUpForm.password.value,
    wishlist: [],
    cart: [],
  };
  postData(userUrl, userObj);
}
