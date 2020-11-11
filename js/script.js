window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("name").focus();
});


const selectJobRole = document.getElementById("title");
// const otherOpt = selectJobRole.querySelector("[value='other']");

// capture the other title text input
const otherTitle = document.getElementById("other-title");

//hide the text input initially with JS in order to get this feature to work when JS is disabled
otherTitle.style.display = "none";

// when the select dropdown changed then...
selectJobRole.addEventListener("change", () => {
  //if the selected value of the option is equal to "other"
  if (selectJobRole.value === "other") {
    // reveal the text input (other-title) when the "Other" option is selected from the "Job Role" drop down menu.
    otherTitle.style.display = "block";
  } else {
    otherTitle.style.display = "none";
  }
})


// let designOpt = document.getElementsByTagName("SELECT").namedItem("design");
const designOpt = document.getElementById("design");
// let colorOptions = document.getElementsByTagName("SELECT").namedItem("color");
const colorOpt = document.getElementById("color");
const colorOptions = document.querySelectorAll('#color option');
const shirtColorDiv = document.getElementById("shirt-colors");



/*===================================
======= T-Shirt Info section ========
=====================================*/


let defaultOpt = document.createElement("option");
defaultOpt.value = "";
defaultOpt.textContent = "Please select a T-shirt theme";
defaultOpt.setAttribute("selected", "selected");

colorOpt.insertBefore(defaultOpt,  colorOpt.firstElementChild);

colorOpt.disabled = true;

for(let i = 0; i < colorOptions.length; i++) {
  colors = colorOpt[i];
  // colors.slice(1, 6).hide();
  if (colors.textContent === "Please select a T-shirt theme") {
    colors.style.display = "block";
  } else {
    colors.style.display = "none";
  }
}


const showRightTheme = (theme) => {
  if (theme.textContent === 'Select Theme'){
    colorOpt.disabled = true;
  } else {
    colorOpt.disabled = false;
  }

  // helper function to display Colors
  const showRightColor = (list) => {
      //for all options in list display / else hide
      colorOptions.forEach((color) => {
          if(list.includes(color.value)){
              color.style.display = 'block';
              colorOpt.firstElementChild.style.display = "none";
          } else {
              color.style.display = 'none';
          }
            //for all elements with selected attribute remove selected
          if(color.hasAttribute('selected')){
              color.removeAttribute('selected');
          }
      });

      //grab the first color and set attribute to selected
      colorOptions.forEach((color) => {
          if(color.style.display === 'block'){
            color.setAttribute('selected', true);
          }
      });
  }

    //conditional for different design value possibilities
    if(theme === "js puns") {
       showRightColor(["cornflowerblue", "darkslategrey", "gold"]);
    } else if (theme === "heart js") {
        showRightColor(["tomato", "steelblue", "dimgrey"]);
    } else {
        showRightColor(['Please select a T-shirt theme']);
    }
}

//event listener - on changes to the design select element
designOpt.addEventListener('change', e => {
    showRightTheme(e.target.value);
});




/*===============================================
======= REGISTER FOR ACTIVITIES SECTION =========
=================================================*/


const activity = document.querySelector(".activities")
const activities = document.querySelectorAll(".activities input");
const activitiesLabel = document.querySelectorAll(".activities label");


const totalCostDiv = document.createElement("h3");
let totalCost = 0;
activity.appendChild(totalCostDiv);


activity.addEventListener("change", (e) => {
  let clicked = e.target;
  let cost = clicked.getAttribute("data-cost");
   cost = parseInt(cost)
  let dayAndTime = clicked.getAttribute("data-day-and-time");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes);

  if (clicked.checked === true) {
    totalCost += cost
  } else if (clicked.checked === false) {
    totalCost -= cost
  }

  totalCostDiv.textContent = `Total: $${totalCost}`

  for(let i = 0; i < checkboxes.length; i++) {
    let checkbox = checkboxes[i];
    let activityDateAndTime = checkbox.getAttribute("data-day-and-time")
    if(dayAndTime === activityDateAndTime && clicked !== checkbox) {
      checkbox.disabled = true;
      checkbox.closest('label').style.color = 'DarkGrey';
      checkbox.closest('label').style.textDecoration = "line-through";
      if (!clicked.checked) {
        checkbox.disabled = false;
        checkbox.closest('label').style.color = 'initial';
        checkbox.closest('label').style.textDecoration = "initial";
      } else {
        checkbox.disabled = true;
      }
    }
  }

})

/*===============================================
=============  Payment info Section =============
=================================================*/

const paymentSection = document.querySelector("#payment");
const payments = document.querySelectorAll("#payment option");
const payPalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");
const creditCardDiv = document.querySelector("#credit-card")

payPalDiv.style.display = "none";
bitcoinDiv.style.display = "none";
payments[0].style.display = "none";
payments[1].selected = true;

paymentSection.addEventListener("change", (e) => {
  let clicked = e.target;
  if (clicked.value === "credit card") {
    creditCardDiv.style.display = "block";
    bitcoinDiv.style.display = "none";
    payPalDiv.style.display = "none";
  } else if (clicked.value === "bitcoin") {
    creditCardDiv.style.display = "none";
    bitcoinDiv.style.display = "block";
    payPalDiv.style.display = "none";
  } else if (clicked.value === "paypal") {
    payPalDiv.style.display = "block";
    bitcoinDiv.style.display = "none";
    creditCardDiv.style.display = "none";
  }
})


/*================================================
===============  From Validation =================
=================================================*/
const form = document.querySelector("form")
const email = document.querySelector("#mail");
const name = document.querySelector("#name")

const emailLabel = document.querySelector("label[for='mail']");

const emailValidation = (e) => {

  const emailValidator = /^\w+@[a-zA-Z]+\.(com|org|net|edu)$/;

  if(email.value === "" || email.value === "Email Required") {
    email.style.borderColor = "red";
    email.insertAdjacentHTML('afterend', '<span id="div-alert">Please put your Email Address</span>');
    document.querySelector("#div-alert").style.color = "red";
    email.style.marginBottom = "0";
    e.preventDefault();
  } else if (emailValidator.test(email.value) === false && email.value.length >= 1) {
    emailInput.style.borderColor = 'red';
    emailInput.value = 'Please Use a Valid Email Address (dave@teamtreehouse.com)';
    e.preventDefault();
  }
  email.addEventListener('click', () => {
  email.style.borderColor = 'rgb(112, 157, 220)';
  email.value = '';
  })
}

const nameValidation = (e) => {
 const nameValidator = /[a-zA-Z]+/;
  if(name.value === "" || name.value === "Name Required") {
    name.style.borderColor = "red";
    name.insertAdjacentHTML('afterend', '<span id="alert">Please put your Name</span>');
    document.querySelector("#alert").style.color = "red";
    name.style.marginBottom = "0";
    e.preventDefault();
  } else if (nameValidator.test(name) === false) {
    emailInput.style.borderColor = 'red';
    emailInput.value = 'Please Use a Valid Name';
    e.preventDefault();
  }
  email.addEventListener('click', () => {
  email.style.borderColor = 'rgb(112, 157, 220)';
  email.value = '';
  })
}



form.addEventListener('submit', (e) => {
    emailValidation(e);
    nameValidation(e);
})
