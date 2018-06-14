// --- Functions ---
function diaryEntry(text) {
  let li = document.createElement('li');
  let d = new Date();
  let formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString();
  let textNode = document.createTextNode(formattedDate + " - " + text);
  li.appendChild(textNode);
  return li;
}

function diarySubmit() {
  let nextEntry = diaryEntry(myTextField.value);
  let text = nextEntry.innerHTML;
  if (myTextField.value !== "") {
    if (typeof (Storage) !== "undefined") {

      // Store entry in the history on the right
      if (localStorage.log) {
        localStorage.log += "<p>" + text + "</p>";
      } else {
        localStorage.log = "<p>" + text + "</p>";
      }

      // Show entry on the left
      myList.appendChild(nextEntry);
      console.log(text);
      myList.scrollTop = myList.scrollHeight;

      // Clear text field
      myTextField.value = "";

    } else {
      alert("Sorry, your browser does not support web storage...");
    }
  }
}

function clearEntries() {
  while (myList.firstChild) {
    myList.removeChild(myList.firstChild)
  };
}

function showHistory() {
  if (localStorage.log !== undefined) {
    myHistory.innerHTML = localStorage.log;
  } else {
    alert('Your history is empty.');
  }
}

function clearHistory() {
  confirm('Are you sure you want to delete your entire history?');
  clearEntries();
  localStorage.clear();
  myHistory.innerHTML = "";
}

// https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
function selectText(node) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    console.warn("Could not select text in node: Unsupported browser.");
  }
}

// --- Structure ---

// Header
let myHeader = document.createElement("h1");
myHeader.innerHTML = "Diary";

// Textfield
let myTextField = document.createElement("input");
myTextField.setAttribute("type", "text");

// Submit
let mySubmitBtn = document.createElement("button");
mySubmitBtn.innerHTML = "Submit";
mySubmitBtn.setAttribute("onclick", "diarySubmit()");

// Clear entries
let myClearEntriesBtn = document.createElement("button");
myClearEntriesBtn.innerHTML = "Clear";
myClearEntriesBtn.setAttribute("onclick", "clearEntries()");

// Show history
let myShowHistoryBtn = document.createElement("button");
myShowHistoryBtn.innerHTML = "Show History";
myShowHistoryBtn.setAttribute("onclick", "showHistory()");

// Select history
let mySelectHistoryBtn = document.createElement("button");
mySelectHistoryBtn.innerHTML = "Select History";
mySelectHistoryBtn.setAttribute("onclick", "selectText(myHistory)");

// Clear history
let myClearHistoryBtn = document.createElement("button");
myClearHistoryBtn.innerHTML = "Clear History";
myClearHistoryBtn.setAttribute("onclick", "clearHistory()")
myClearHistoryBtn.style.color = "red";

// List
let myList = document.createElement("ul", {
  is: "my-list"
});
myList.id = "myList";

// History
let myHistory = document.createElement("div");
myHistory.innerHTML = "";
myHistory.id = "myHistory";

// Add to page
document.body.appendChild(myHeader);
document.body.appendChild(myTextField);
document.body.appendChild(mySubmitBtn);
document.body.appendChild(myClearEntriesBtn);
document.body.appendChild(myShowHistoryBtn);
document.body.appendChild(mySelectHistoryBtn);
document.body.appendChild(myClearHistoryBtn);
document.body.appendChild(myList);
document.body.appendChild(myHistory);