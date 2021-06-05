const ALLOW_LETTER_AND_SPACE_REGEX = /[^a-zA-Z ]/g;
const ALLOW_NUMBERS_REGEX = /[^0-9]/g;
const EMAIL_REGEX =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let isLoading = false;
let isMailSent = false;

const nameElement = document.getElementById("txt-name");
const emailElement = document.getElementById("txt-email");
const mobileNoElement = document.getElementById("txt-mobile-number");
const nameErrorElement = document.getElementById("error-name");
const emailErrorElement = document.getElementById("error-email");
const mobileNoErrorElement = document.getElementById("error-mobile-number");

let showNameElement = document.getElementById("show-name");
let showEmailElement = document.getElementById("show-email");
let showMobileNoElement = document.getElementById("show-mobile-no");
let showMailStatusElement = document.getElementById("send-mail-status");
let showMailSummaryElement = document.getElementById("summary");
let showdetailSummaryElement = document.getElementById("summary-details");

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
let submitButton = document.getElementById("btn-submit");
function sendMail() {
  const currentFormatedDate = getFormatedDate();
  userName = nameElement.value.replace(/\s\s+/g, " ");
  let mailParams = {
    to_name: "Team",
    user_name: userName,
    email_address: emailElement.value,
    mobile_no: mobileNoElement.value,
    received_on: currentFormatedDate,
  };

  submitButton.setAttribute("disabled", true);
  submitButton.style.backgroundColor = "gray";
  submitButton.innerText = "Sending Mail ....";
  isLoading = true;

  emailjs.send("service_u8k5ncc", "template_af4cowi", mailParams).then(
    function (res) {
      submitButton.innerText = "Send Mail";
      submitButton.style.backgroundColor = "#22b352";

      showNameElement.innerText = userName;
      showEmailElement.innerText = emailElement.value;
      showMobileNoElement.innerText = mobileNoElement.value;
      modal.style.display = "block";
      isLoading = false;
      isMailSent = true;
    },
    function (error) {
      submitButton.innerText = "Send Mail";
      submitButton.style.backgroundColor = "#22b352";
      showMailStatusElement.innerText = "Sending Mail failed";
      showMailSummaryElement.innerText = "Please try again after sometime";
      showdetailSummaryElement.style.display = "none";
      showMailStatusElement.style.backgroundColor = "red";
      modal.style.display = "block";
      isLoading = false;
    }
  );
}

function allowLettersAndSpaceOnly(input) {
  let value = input.value;
  let letters = value.replace(ALLOW_LETTER_AND_SPACE_REGEX, "");
  input.value = letters;
  validateNameRequired();
}

function allowNumbersOnly(input) {
  let value = input.value;
  let numbers = value.replace(ALLOW_NUMBERS_REGEX, "");
  input.value = numbers;
  validateMobileNoRequired();
}

function validateMobileNumberLength() {
  if (mobileNoElement.value.length === 0) {
    mobileNoErrorElement.innerText = "Please provide your mobile number";
    return;
  }

  if (mobileNoElement.value.length < 10)
    mobileNoErrorElement.innerText = "Mobile number should be of 10-digit";
}
function validateEmail() {
  if (EMAIL_REGEX.test(emailElement.value)) {
    emailErrorElement.innerText = "";
  } else {
    emailErrorElement.innerText =
      emailElement.value === ""
        ? "Please provide your email"
        : "Please enter a valid email";
  }
}

function validateNameRequired() {
  nameErrorElement.innerText =
    nameElement.value === "" ? "Please provide your name" : "";
}
function validateMobileNoRequired() {
  mobileNoErrorElement.innerText =
    mobileNoElement.value === "" ? "Please provide your mobile number" : "";
}

function validateForm(event) {
  event.preventDefault();
  if (isLoading) return;
  validateNameRequired();
  validateEmail();
  validateMobileNumberLength();
  if (
    !nameErrorElement.innerText &&
    !emailErrorElement.innerText &&
    !mobileNoErrorElement.innerText
  ) {
    sendMail();
  }
}

function getFormatedDate() {
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const time =
    dateObj.getHours() +
    ":" +
    dateObj.getMinutes() +
    ":" +
    dateObj.getSeconds();

  const formatedDate = month + "\n" + day + ", " + year + " " + time;
  return formatedDate;
}

function resetForm() {
  nameElement.value = "";
  emailElement.value = "";
  mobileNoElement.value = "";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  if (isMailSent) {
    resetForm();
    isMailSent = false;
  }

  submitButton.removeAttribute("disabled");
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    if (isMailSent) {
      resetForm();
      isMailSent = false;
    }

    submitButton.removeAttribute("disabled");
    modal.style.display = "none";
  }
};
