const openMenu = function() {
    sidemenu.style.top = "0";
}

const closeMenu = function() {
    sidemenu.style.top = "-300px";
}

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