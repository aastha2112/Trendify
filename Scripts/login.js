import { getData, postData } from "./requestComponents.js";
import { userUrl } from "./urls.js";

let signInForm = document.getElementById("signInForm");

signInForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    if (!signInForm.email.value || !signInForm.password.value) {
      return;
    }
    let data = await getData(userUrl).then((data) => data);
    let userAlreadyPresent = data.filter(
      (el) => el.email == signInForm.email.value
    );

    if (userAlreadyPresent.length > 0) {
      let passwordEntered = userAlreadyPresent[0].password;
      console.log(passwordEntered);
      if (signInForm.password.value === passwordEntered) {
        alert("Login Successful!");
        window.location.href = "index.html";
        localStorage.setItem(
          "userLoginTrendify",
          JSON.stringify({
            email: signInForm.email.value,
            password: signInForm.password.value,
          })
        );
      } else {
        alert("Incorrect password!");
      }
    } else {
      alert("User doesn't exist! Please Sign up.");
      window.location.href = "signUp.html";
    }
  } catch (error) {
    console.log(error);
    alert("Sorry! Unable to Login.");
  }
});
