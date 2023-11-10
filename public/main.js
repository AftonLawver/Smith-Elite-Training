const openMenu = function() {
    sidemenu.style.top = "0";
}

const closeMenu = function() {
    sidemenu.style.top = "-300px";
}

const submitButton = document.getElementById('sendInquiryButton');
submitButton?.addEventListener("click", e => {
  e.preventDefault();

  let p = new Promise((resolve, reject) => {
    let isFormValid = validateForm();

    if (isFormValid) {
      resolve();
    }
    else {
      reject("Form validation failed.");
    }
  })

  .then(() => {
    return sendDataToDatabase();
  })
  .then (() => {
    // send text message here
    sendTextMessage();
    window.location.href = '/form_submission_success.html';
  })

  .catch(error => {
    console.error('An error occurred:', error);
  });  
}) 

function validateName() {
  const nameInput = document.getElementById('nameInput');
  if (!nameInput.value.match(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/)) {
    let nameErrorMessage = document.getElementById("nameErrorMessage");
    nameErrorMessage.innerHTML = "Please enter a valid" +
        " name.";
        nameInput.style.border = "2px solid red";
    nameErrorMessage.style.display = "block";
    return false;
  } else {
    let nameErrorMessage = document.getElementById("nameErrorMessage");
    nameInput.style.border = "2px solid green";
    nameErrorMessage.style.display = "none";
    return true;
  }
}

function validatePhone() {
  const phoneNumberInput = document.getElementById('phoneNumberInput');
  const phoneNumberErrorMessage = document.getElementById("phoneNumberErrorMessage");
  if (!phoneNumberInput.value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
    phoneNumberErrorMessage.innerHTML = "Please enter a valid phone" +
      " number.";
      phoneNumberInput.style.border = "2px solid red";
    phoneNumberErrorMessage.style.display = "block";
    return false;
  }
  else {
      phoneNumberInput.style.border = "2px solid green";
    phoneNumberErrorMessage.style.display = "none";
    return true;
  }
}

const getFormData = function() {
  const name = document.getElementById('nameInput').value;
  const phone = document.getElementById('phoneNumberInput').value;
  const message = document.getElementById('formTextArea').value;
  return {name: name, phone: phone, message: message};
}

const validateForm = function() {
  if (validateName && validatePhone) {
    return true;
  }
  else {
    return false;
  }
}

const sendTextMessage = function() {
  const data = getFormData();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch('/sendText', options) 
    .then((response) => response.json());
  }

const sendDataToDatabase = function() {
  const data = getFormData();

    const headers = {
      'Content-Type': 'application/json'
    };

    const fetchOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    };

    fetch('/submit', fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Post request failed.");
      }
      else {
        return true;
      }
})
}
