// Returns a timestamped version of the text
function formatEntry(text) {
  let d = new Date();
  let formattedDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.toLocaleTimeString();
  return formattedDate + ' - ' + text;
}

// Saves textfield.value to localStorage.log and 
// then sets history.value to the new localStorage.log
function diarySubmit(textfield, history, timestamp = true, indices = true, clearOnSubmission = true) {
  if (textfield.value === '') {
    return;
  }

  if (typeof (Storage) === 'undefined') {
    alert('Sorry, your browser does not support web storage...');
  } else {
    let entry = formatEntry(textfield.value) + '\n';
    if (localStorage.log) {
      localStorage.log += '[' + (localStorage.log.split('\n').length - 1) + '] ' + entry;
    } else {
      localStorage.log = '[0] ' + entry;
    }
  }

  if (clearOnSubmission) {
    textfield.value = '';
  }

  showHistory(history, timestamp, indices);
}

// Sets history.value to the localStorage.log 
// and optionally removes the timestamps or the indices
function showHistory(history, timestamp = true, indices = true) {
  let logArray = localStorage.log.split('\n');
  let noStamps = logArray.map(function (entry) {
    return entry.substr(entry.indexOf('-') + 2, entry.length)
  }).join('\n');

  // Strip stamps from localStorage.log based on parameter values
  if (timestamp && indices) {
    history.value = localStorage.log;
  } else if (timestamp) {
    let timeStampedLog = [];
    for (let i in logArray) {
      timeStampedLog.push(logArray[i].substr(logArray[i].indexOf(']') + 2, logArray[i].length));
    }
    history.value = timeStampedLog.join('\n');
  } else if (indices) {
    let indexedLog = [];
    for (let i in logArray) {
      indexedLog.push(logArray[i].substr(0, logArray[i].indexOf(']') + 1) + logArray[i].substr(logArray[i].indexOf('-') + 1, logArray[i].length));
    }
    history.value = indexedLog.join('\n');
  } else {
    history.value = noStamps;
  }

  // Automatically scroll down
  history.scrollTop = history.scrollHeight;

  if (localStorage.log === 'undefined') {
    history.value = '';
    localStorage.log = '';
  }
}

function copy(node) {
  node.select();
  document.execCommand('Copy');
}

// Returns a new localStorage.log with the given index removed
function deleteLine(index) {
  let array = localStorage.log.split('\n');

  if (index === 'undefined' || index > array.length - 2) {
    return;
  }

  array.splice(index, 1);
  for (let i in array) {
    array[i] = '[' + i + ']' + array[i].substr(array[i].indexOf(']') + 1, array[i].length);
  }
  array.pop();

  // Prevent returning '\n' when clearing the diary using "Delete Line"
  if (array.length === 0) {
    return undefined;
  }

  return array.join('\n') + '\n';
}

function clearStorage(history) {
  if (confirm('Are you sure you want to delete your entire history?')) {
    localStorage.clear();
    get(history).value = '';
  }
}