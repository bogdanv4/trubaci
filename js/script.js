const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#comments");
const errors = document.querySelectorAll(".error");
const confirmation = document.querySelector(".confirm-sent");
const submitButton = document.querySelector("#submitBtn");

const validateEmail = function (email) {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email.match(pattern)) errors[1].style.opacity = 1;
  else return true;
};

const validateName = function (firstName) {
  if (firstName.length < 3) errors[0].style.opacity = 1;
  else return true;
};

const validateMessage = function (message) {
  if (message.length < 10) errors[2].style.opacity = 1;
  else return true;
};

const clearFields = function () {
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
};

const validAll = function (validateName, validateEmail, validateMessage) {
  if (validateName && validateEmail && validateMessage) {
    console.log(`Ime: ${emailInput.value}
        email: ${emailInput.value} 
        poruka: ${messageInput.value}`);
    clearFields();
  }
};

const clearError = function () {
  errors.forEach((error) => (error.style.opacity = 0));
};

const sendMail = function (name, email, message) {
  let params = {
    name,
    email,
    message,
  };

  emailjs.send("service_i8qxnce", "template_4sqgokw", params).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
};

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  clearError();

  if (validateName && validateEmail && validateMessage) {
    console.log(`Ime: ${nameInput.value}
        email: ${emailInput.value} 
        poruka: ${messageInput.value}`);
    sendMail(nameInput.value, emailInput.value, messageInput.value);
    confirmation.style.opacity = 1;

    clearFields();
  }
});
