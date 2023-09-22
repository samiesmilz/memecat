// Get references to the input and div elements
const imageContainer = document.getElementById("imageContainer");
const settingsDiv = document.querySelector("#settings-div");
const generatedMemesDiv = document.querySelector("#generated-memes");

// Get references to the input and image elements
const imageUrlInput = document.getElementById("imageUrlInput");
const img = document.getElementById("loadedImage");
const loadImageButton = document.getElementById("loadImageButton");
const notifyElement = document.querySelector("#notify");

// Get references
const inputFieldsDiv = document.querySelector("#input-fields");
const removeBgDiv = document.querySelector("#remove-bg-div");
const checkbox = document.querySelector("#remove-bg");
const memeStyle = document.querySelector("#meme-style");

// Get references to top text and bottom text elements
const topTextElement = document.querySelector(".top-text");
const bottomTextElement = document.querySelector(".bottom-text");

// Get references to top text and bottom text input elements
const topTextInput = document.querySelector("#top-text-input");
const bottomTextInput = document.querySelector("#bottom-text-input");
const fontPicker = document.querySelector("#pick-font");
const fontColorPicker = document.querySelector("#font-color-picker");
const bgColorPicker = document.querySelector("#bg-color");

// Get refences to buttons on page
const generateMemeBtn = document.querySelector("#generate-meme");

loadImageButton.addEventListener("click", function () {
  // Get image URL
  const imageUrl = imageUrlInput.value;

  // Check if there is a URL in the url input feild
  if (!imageUrl) {
    // Notify user if url is invalid
    imageUrlInput.setAttribute("placeholder", "Please enter a valid url...");
    setTimeout(function () {
      // Reset the notifications
      imageUrlInput.setAttribute("placeholder", "Enter Image URL here...");
    }, 3000);

    return;
  }
  setDefaults();
  img.src = imageUrl;
  imageUrlInput.value = "";
});

function updateMemeText() {
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  // Now set the meme text
  topTextElement.textContent = topText;
  bottomTextElement.textContent = bottomText;
}

function updateMemeStyle() {
  // Set font style prefferences
  topTextElement.style.fontFamily = fontPicker.value;
  topTextElement.style.color = fontColorPicker.value;
  bottomTextElement.style.fontFamily = fontPicker.value;
  bottomTextElement.style.color = fontColorPicker.value;

  if (checkbox.checked) {
    // Checkbox is checked
    topTextElement.style.backgroundColor = "transparent";
    bottomTextElement.style.backgroundColor = "transparent";
  } else {
    // Checkbox is not checked
    topTextElement.style.backgroundColor = bgColorPicker.value;
    bottomTextElement.style.backgroundColor = bgColorPicker.value;
  }
}

// Set dinout defaults
function setDefaults() {
  fontColorPicker.value = "#FFFFFF";
  bgColorPicker.value = "#000000";
  topTextInput.value = "";
  bottomTextInput.value = "";
  topTextElement.innerText = "Top Text Here";
  bottomTextElement.innerText = "Bottom Text Here";
}

// Generate meme
function generateMeme() {
  // Form validation
  if (topTextInput.value === "" || bottomTextInput.value === "") {
    notifyElement.innerHTML = "Please enter top and bottom text...";
    notifyElement.style.color = "red";
    setTimeout(() => {
      notifyElement.innerHTML = "Make your next meme...";
      notifyElement.style.color = "black";
    }, 4000);
    return;
  }
  // Create a div for the meme
  const readyMemeDiv = document.createElement("div");
  readyMemeDiv.classList.add("new-meme");

  // Create a canvas for the meme with a higher resolution
  const canvas = document.createElement("canvas");

  // Get the image element
  const img = document.getElementById("loadedImage");
  const imgWidth = img.width;
  const imgHeight = img.height;

  // Set canvas dimensions based on image dimensions while maintaining aspect ratio
  const canvasWidth = 2300; // Higher resolution canvas width
  const scaleFactor = imgWidth / canvasWidth;
  const canvasHeight = imgHeight / scaleFactor;

  // Set canvas dimensions
  canvas.classList.add("new-meme");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Get the canvas context
  const ctx = canvas.getContext("2d");

  // Define font variables
  const defaultFontSize = 96; // Higher resolution font size
  const fontWeight = "bold";
  const fontFace = fontPicker.value; // Get the selected font from user input
  const fontColor = fontColorPicker.value; // Get the selected font color from user input
  let bgColor;
  if (checkbox.checked) {
    bgColor = "transparent"; // Get the selected background color from user input
  } else {
    bgColor = bgColorPicker.value; // Get the selected background color from user input
  }

  // Set the font using variables
  ctx.font = `${fontWeight} ${defaultFontSize}px ${fontFace}`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Get top and bottom text
  const topText = topTextElement.innerText;
  const bottomText = bottomTextElement.innerText;

  // Measure the text width
  const topTextWidth = ctx.measureText(topText).width;
  const bottomTextWidth = ctx.measureText(bottomText).width;

  // Clear the canvas with the background color
  ctx.fillStyle = bgColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the image from the existing image element
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Calculate the position and size of the background rectangle for top text
  const topRectX = 0;
  const topRectY = 0;
  const topRectWidth = canvas.width;
  const topRectHeight = defaultFontSize;

  // Draw the background rectangle for top text
  ctx.fillStyle = bgColor;
  ctx.fillRect(topRectX, topRectY, topRectWidth, topRectHeight);

  // Draw top text
  ctx.fillStyle = fontColor;
  ctx.fillText(topText, canvas.width / 2, topRectY);

  // Calculate the position and size of the background rectangle for bottom text
  const bottomRectX = 0;
  const bottomRectY = canvas.height - defaultFontSize;
  const bottomRectWidth = canvas.width;
  const bottomRectHeight = defaultFontSize;

  // Draw the background rectangle for bottom text
  ctx.fillStyle = bgColor;
  ctx.fillRect(bottomRectX, bottomRectY, bottomRectWidth, bottomRectHeight);

  // Draw bottom text
  ctx.fillStyle = fontColor;
  ctx.fillText(bottomText, canvas.width / 2, bottomRectY);

  // Append the canvas to the meme div
  readyMemeDiv.append(canvas);

  // Add control buttons
  const controlDiv = document.createElement("div");
  const downloadBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  controlDiv.classList.add("control-div");
  downloadBtn.classList.add("control-btn");
  deleteBtn.classList.add("control-btn");

  // Add text to control buttons
  downloadBtn.innerText = "Download";
  deleteBtn.innerText = "Delete";

  // Append me and its controls
  controlDiv.append(readyMemeDiv, deleteBtn);

  // Append the meme div to the generated memes container
  setDefaults();
  generatedMemesDiv.append(controlDiv);
}

// Delete meme function
function deleteMeme(targetElement) {
  targetElement.parentElement.remove();
}
// Add event -listener for contorls
generatedMemesDiv.addEventListener("click", ({ target }) => {
  if (target.innerText === "Delete") {
    deleteMeme(target);
  }
  // else if (target.innerText === "Download") {
  //   downloadMeme(target);
  // }
});

// Just a try caption
function funnyCaption() {
  topTextElement.innerText = "When you open your front camera...";
  bottomTextElement.innerText = "By accident!";
  setTimeout(() => {
    setDefaults();
  }, 4000);
}

// Add event listeners
memeStyle.addEventListener("input", updateMemeStyle);
inputFieldsDiv.addEventListener("input", updateMemeText);
generateMemeBtn.addEventListener("click", generateMeme);

// When window loads, set style defualts
window.addEventListener("load", funnyCaption());

// // Download meme function
// function downloadMeme(targetElement) {
//   // Get the canvas element where the meme is drawn
//   const memeCanvas = targetElement.parentElement.querySelector("canvas");

//   // Convert the canvas content to a data URL (PNG format in this example)
//   const dataURL = memeCanvas.toDataURL("image/png");

//   // Prompt the user for a filename
//   const filename = window.prompt("Enter a filename...", "my-meme.png");

//   // Check if the user entered a filename
//   if (filename) {
//     // Create a temporary anchor element for the download
//     const downloadLink = document.createElement("a");
//     downloadLink.href = dataURL;
//     downloadLink.download = filename;

//     // Trigger the download by programmatically clicking the anchor
//     downloadLink.click();
//   }
// }
