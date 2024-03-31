// Declaring Variables
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const clearAllButton = document.getElementById('clear-all')

// Adding Tasks 
function addTask() {
    if (inputBox.value === ''){
        alert('You must write something');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        li.setAttribute('draggable', true);

        clearAllButton.style.display = 'inline-block';
    }
    // Making Input Field Blank
    inputBox.value = "";
    saveData();
}

// Checking and Canceling Tasks
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Adding Tasks with Enter Key
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Drag and Drop Functionality
let dragged;

listContainer.addEventListener('dragstart', function(e) {
    dragged = e.target;
    e.target.style.opacity = 0.5;
});

listContainer.addEventListener('dragover', function(e) {
    e.preventDefault();
});

listContainer.addEventListener('drop', function(e) {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        if (e.target.nextSibling === dragged) {
            e.target.parentNode.insertBefore(dragged, e.target.nextSibling.nextSibling);
        } else {
            e.target.parentNode.insertBefore(dragged, e.target.nextSibling);
        }
    } else {
        listContainer.appendChild(dragged);
    }
    dragged.style.opacity = 1;
    saveData();
});

// Saving Tasks Data to Local Storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Display Task Data after Reload
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// Clearing All Added Tasks
clearAllButton.addEventListener('click', function() {
    listContainer.innerHTML = '';
    saveData();
    clearAllButton.style.display = 'none';
});
