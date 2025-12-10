const placeholders = document.querySelectorAll('.placeholder');
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addTaskBtn = document.querySelector('.add-task-button');
let item = document.querySelectorAll('.item');
let currentObjSaveEventTarget = {}

lisItem();

placeholders.forEach(placeholder => {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', drop);
})

addTaskBtn.addEventListener('click', () => {
    if (inputBox.value.trim() === '') {
        alert('Please enter a valid task');
    } else {
        const newItem = createItem()
        listContainer.append(newItem);

        const deleteBtn = removeItem();
        newItem.append(deleteBtn);

        item = document.querySelectorAll('.item');
        lisItem();
    }
    inputBox.value = '';
})

function lisItem() {
    item.forEach((item) => {
        item.addEventListener('dragstart', dragstart);
        item.addEventListener('dragend', dragend);
    })
}

function dragstart(e) {
    e.target.classList.add('hold');
    setTimeout(() => e.target.classList.add('hide'), 0);
    currentObjSaveEventTarget.key = e.target;
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
    let elem = currentObjSaveEventTarget.key
    if (e.target.tagName === 'LI') {
        e.target.classList.remove('hovered');
        e.target.parentElement.append(elem)
    } else {
        e.target.classList.remove('hovered');
        e.target.append(elem)
    }
}

function createItem() {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    li.classList.add('item');
    li.setAttribute('draggable', 'true');
    return li;
}

function removeItem() {
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    span.classList.add('delete');
    span.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
        }
    });
    return span;
}
