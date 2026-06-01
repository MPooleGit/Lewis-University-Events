function logIn(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
     const password = document.getElementById("password").value;
     const errorMessage = document.getElementById("error-message");

     const correctUsername = "admin";
     const correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {

    window.location.href = "homepage.html";
}  else {
    errorMessage.textContent = "Incorrect username or password.";
  }

}

 
