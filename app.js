// --- Main functions ---
function formatEntry(text) {
  let d = new Date();
  let formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString();
  return formattedDate + " - " + text;
}

function diarySubmit(textfield) {
  let entry = formatEntry(textfield.value);
  if (typeof (Storage) === "undefined") {
    alert("Sorry, your browser does not support web storage...");
  } else {
    if (localStorage.log) {
      localStorage.log += entry + "\n";
    } else {
      localStorage.log = entry + "\n";
    }

    textfield = "";
  }
}

function showEntry(list, input) {
  let entry = formatEntry(input.value)
  list.value += entry + "\n";
  console.log(entry);
  list.scrollTop = list.scrollHeight;
}

function clearVal(node) {
  node.value = "";
}

function copyNode(node) {
  node.select();
  document.execCommand('Copy');
}

function showHistory() {
  if (localStorage.log !== undefined) {
    myHistory.innerHTML = localStorage.log;
  } else {
    alert('Your history is empty.');
  }
}

function clearStorage(history) {
  if (confirm('Are you sure you want to delete your entire history?')) {
    localStorage.clear();
    clearVal(history)
  }
}

function submitAndShow(textfield, list) {
  if (textfield.value === "") {
    return;
  }

  diarySubmit(textfield);
  showEntry(list, textfield);
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
mySubmitBtn.setAttribute("onclick", "submitAndShow(myTextField, myList); return false;");

// Clear entries
let myClearEntriesBtn = document.createElement("button");
myClearEntriesBtn.innerHTML = "Clear";
myClearEntriesBtn.setAttribute("onclick", "clearVal(myList)");

// Show history
let myShowHistoryBtn = document.createElement("button");
myShowHistoryBtn.innerHTML = "Show History";
myShowHistoryBtn.setAttribute("onclick", "showHistory()");

// Copy history
let myCopyHistoryBtn = document.createElement("button");
myCopyHistoryBtn.innerHTML = "Copy History";
myCopyHistoryBtn.setAttribute("onclick", "copyNode(myHistory)");

// Clear history
let myClearHistoryBtn = document.createElement("button");
myClearHistoryBtn.innerHTML = "Clear History";
myClearHistoryBtn.setAttribute("onclick", "clearStorage(myHistory);")
myClearHistoryBtn.style.color = "red";

// List
let myList = document.createElement("textarea");
myList.id = "myList";
myList.className = "terminal";
myList.readOnly = true;

// History
let myHistory = document.createElement("textarea");
myHistory.innerHTML = "";
myHistory.id = "myHistory";
myHistory.className = "terminal";
myHistory.readOnly = true;

// Add to page
document.body.appendChild(myHeader);
myForm = document.createElement("form");
document.body.appendChild(myForm);
myForm.appendChild(myTextField);
myForm.appendChild(mySubmitBtn);
document.body.appendChild(myClearEntriesBtn);
document.body.appendChild(myShowHistoryBtn);
document.body.appendChild(myCopyHistoryBtn);
document.body.appendChild(myClearHistoryBtn);
document.body.appendChild(myList);
document.body.appendChild(myHistory);