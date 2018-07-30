// --- Main functions ---
function showLogs(display) {
  if (localStorage.log === "") {
    return;
  }
}

function formatEntry(text) {
  let d = new Date();
  let formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString();
  return formattedDate + " - " + text;
}

function diarySubmit(textfield, history) {
  if (textfield.value === "") {
    return;
  }

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

  history.value = localStorage.log;
  history.scrollTop = history.scrollHeight;
}

function clearVal(node) {
  node.value = "";
}

function copyNode(node) {
  node.select();
  document.execCommand('Copy');
}

function clearStorage(history) {
  if (confirm('Are you sure you want to delete your entire history?')) {
    localStorage.clear();
    clearVal(history)
  }
}

// --- Structure ---
// Header
let myHeader = document.createElement("h1");
myHeader.innerHTML = "Diary";

// Submit
let mySubmitBtn = document.createElement("button");
mySubmitBtn.innerHTML = "Submit";
mySubmitBtn.setAttribute("onclick", "diarySubmit(myTextField, myHistory); return false;");

// Copy history
let myCopyHistoryBtn = document.createElement("button");
myCopyHistoryBtn.innerHTML = "Copy History";
myCopyHistoryBtn.setAttribute("onclick", "copyNode(myHistory)");

// Clear history
let myClearHistoryBtn = document.createElement("button");
myClearHistoryBtn.innerHTML = "Clear History";
myClearHistoryBtn.setAttribute("onclick", "clearStorage(myHistory);")
myClearHistoryBtn.style.color = "red";

// History
let myHistory = document.createElement("textarea");
myHistory.innerHTML = "";
myHistory.id = "myHistory";
myHistory.className = "terminal";
myHistory.readOnly = true;

// Textfield
let myTextField = document.createElement("input");
myTextField.setAttribute("type", "text");

// Add to page
document.body.appendChild(myHeader);
myForm = document.createElement("form");
document.body.appendChild(myForm);
myForm.appendChild(myTextField);
myForm.appendChild(mySubmitBtn);
document.body.appendChild(myCopyHistoryBtn);
document.body.appendChild(myClearHistoryBtn);
document.body.appendChild(myHistory);