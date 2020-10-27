const firstInput = document.getElementById("name");

//When the page first loads, the first text field should be in focus by default.
window.addEventListener('DOMContentLoaded', (event) => {
    firstInput.focus();
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

let defaultOpt = document.createElement("option");
defaultOpt.value = "";
defaultOpt.textContent = "Please select a T-shirt theme";
defaultOpt.setAttribute("selected", "selected");

colorOpt.insertBefore(defaultOpt,  colorOpt.firstElementChild);

colorOpt.disabled = true;

for(let i = 0; i < colorOpt.length; i++) {
  colors = colorOpt[i];
  // colors.slice(1, 6).hide();
  if (colors.textContent === "Please select a T-shirt theme") {
    colors.style.display = "block";
  } else {
    colors.style.display = "none";
  }
}

//Parsing html collection(colors) to an array and split it the colors with the Array.slice(start,end)
/*     let colorsArr = Object.values(colorOpt);
    console.log(colorsArr);
    let jsPuns = colorsArr.slice(1,3);
    console.log(jsPuns);
    let loveJs = colorsArr.slice(4,7);
    console.log(loveJs); */


/* designOpt.addEventListener("change", (e) => {
  let designSelected = e.target.value;
  colorOptions.forEach((color, index) => {
    if (designSelected === "js puns") {
      colorOpt.disabled = false;
      // colorOptions.value = "Cornflower Blue (JS Puns shirt only)";
      if (index === 1 || index < 3) {
        // let onlyPuns = color(0, 3);
        color.style.display = 'block';
        color(3, 6).style.display = "none";
      }
    } else if (designSelected === "heart js") {
      colorOpt.disabled = false;
      if (index >= 3) {
        color.style.display = 'block';
        color(0, 3).style.display = "none";
      }
    }
  })
}) */

const showRightTheme = (theme) => {
  if (theme === 'unselected'){
    colorOpt.disabled = true;
  } else {
    colorOpt.disabled = false;
  }

  // helper function to display Colors
    const showRightColor = (list) => {
        //for all options in list display / else hide
        colorOptions.forEach((color, index) => {
            if(list.includes(color.value)){
                color.style.display = 'block';
            } else {
                color.style.display = 'none';
            }
             //for all elements with selected attribute remove selected
            if(color.hasAttribute('selected')){
                color.removeAttribute('selected');
            }
        });

        //grab the first color and set attribute to selected
        colorOptions.forEach((color, index) => {
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


