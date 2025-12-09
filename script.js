
const placeholders = document.querySelectorAll('.placeholder');
let o = {}
let item = document.querySelectorAll('.item');
console.log(item)
lisItem();
function lisItem() {

    item.forEach((item) => {
        item.addEventListener('dragstart', dragstart);
        item.addEventListener('dragend', dragend);
    })
}
placeholders.forEach(placeholder => {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', drop);
    placeholder.addEventListener('click', function (e) {
        // if (e.target.tagName === 'LI') {
        //     // e.target.classList.toggle('checked');
        //     saveData()
        // } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        //     saveData()
        // }
    }, false);
})

function dragstart(e) {
    // lisItem()
    // console.log(e.target)
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

    if(e.target.tagName === 'LI'){
        e.target.classList.remove('hovered');
        console.log(e.target)
        console.log(s);
        e.target.parentElement.append(s)
    }
    else {
        console.log(e.target)
        console.log(s);
        e.target.classList.remove('hovered');
        e.target.append(s)

    }
}



const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a valid task');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        li.classList.add('item');
        li.setAttribute('draggable', 'true');
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        span.classList.add('delete');
        li.appendChild(span);
        item = document.querySelectorAll('.item');
        lisItem();
        console.log(item);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    // if (e.target.tagName === 'LI') {
    //     // e.target.classList.toggle('checked');
    //     saveData()
    // } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    //     saveData()
    // }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}

// showTask();