const item = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');
let o = {}
item.forEach((item) => {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
})

placeholders.forEach(placeholder => {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', drop);
})

function dragstart(e) {
    e.target.classList.add('hold');
    setTimeout(() => e.target.classList.add('hide'), 0);
    o.key = e.target;
}

function dragend(e) {
    e.target.className = 'item';

}

function dragover(e) {
    e.preventDefault();
}
function dragenter(e) {
    e.target.classList.add('hovered');
}
function dragleave(e) {
    e.target.classList.remove('hovered');
}
function drop(e) {
    let s = o.key
    e.target.classList.remove('hovered');
    e.target.append(s);

}



const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a valid task');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData()
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}

// showTask();