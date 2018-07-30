// --- Main functions ---
function formatEntry(text) {
  let d = new Date();
  let formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString();
  return formattedDate + " - " + text;
}

function diarySubmit(textfield, history, timestamp = true, indices = true, clearOnSubmission = true) {
  if (textfield.value === "") {
    return;
  }

  if (typeof (Storage) === "undefined") {
    alert("Sorry, your browser does not support web storage...");
  } else {
    let entry = formatEntry(textfield.value) + "\n";
    if (localStorage.log) {
      localStorage.log += "[" + (localStorage.log.split("\n").length - 1) + "] " + entry;
    } else {
      localStorage.log = "[0] " + entry;
    }
  }

  if (clearOnSubmission) {
    textfield.value = "";
  }

  showHistory(history, timestamp, indices);
}

function showHistory(history, timestamp = true, indices = true) {
  let logArray = localStorage.log.split("\n");
  let noStamps = logArray.map(function (entry) {
    return entry.substr(entry.indexOf("-") + 2, entry.length)
  }).join("\n");
  if (timestamp && indices) {
    history.value = localStorage.log;
  } else if (timestamp) {
    let timeStampedLog = [];
    for (let i in logArray) {
      timeStampedLog.push(logArray[i].substr(logArray[i].indexOf("]"), logArray[i].length));
    }
    history.value = timeStampedLog.join("\n");
  } else if (indices) {
    let indexedLog = [];
    for (let i in logArray) {
      indexedLog.push(logArray[i].substr(0, logArray[i].indexOf("]")) + logArray[i].substr(logArray[i].indexOf("-") + 1, logArray[i].length));
    }
    history.value = indexedLog.join("\n");
  } else {
    history.value = noStamps;
  }

  history.scrollTop = history.scrollHeight;

  if (localStorage.log === "undefined") {
    history.value = "";
    localStorage.log = "";
  }
}

function copy(node) {
  node.select();
  document.execCommand("Copy");
}

function deleteLine(index) {
  if (index === "undefined") {
    return;
  }

  let array = localStorage.log.split("\n");
  array.splice(index, 1);
  for (let i in array) {
    array[i] = "[" + i + "]" + array[i].substr(array[i].indexOf("]") + 1, array[i].length);
  }
  array.pop();
  return array.join("\n") + "\n";
}

function clearStorage() {
  if (confirm("Are you sure you want to delete your entire history?")) {
    localStorage.clear();
  }
}