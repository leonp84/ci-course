let lArray = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter' ) { addItem() }
    })
    document.getElementById('inputButton').addEventListener('click', function() {
        addItem()
    })
    document.getElementById('sortButton').addEventListener('click', function() {
        sortList()
    })
    document.getElementById('showActive').addEventListener('click', function() {
        displayList('active')
    })
    document.getElementById('showCompleted').addEventListener('click', function() {
        displayList('completed')
    })
    document.getElementById('showAll').addEventListener('click', function() {
        displayList()
    })
    document.getElementById('clearCompleted').addEventListener('click', function() {
        clearCompleted()
    })

    addItem('First Item...');
    addItem('Second Item...');
})

function addItem (userInput) {
    if (!userInput) { userInput = document.getElementById('userInput').value }
    if (userInput === "") { return; }
    
    let order = lArray.length;
    lArray.push( {
        'order' : order,
        'content' : userInput,
        'checked' : false
     });
    displayList();
    clearFocus();

}

function clearFocus() {
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').focus();
}

function displayList(type) {

    console.log("=============");
    for (let i in lArray) {
        console.log("\n");
        console.log(lArray[i].order);
        console.log(lArray[i].content);
        console.log(lArray[i].checked);
    }   
    console.log("=============");

    let list = document.body.getElementsByTagName('ul')[0];
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    let thisArray = lArray;

    if (type === 'active') {
        thisArray = [];
        for (let i in lArray) {
            if (lArray[i].checked === false) { thisArray.push(lArray[i])             }
        }
    }

    if (type === 'completed') {
        thisArray = [];
        for (let i in lArray) {
            if (lArray[i].checked === true) { thisArray.push(lArray[i])             }
        }

    }

    for (i = 0; i < thisArray.length; i++) {
        let newItem = `<input type="checkbox" class="checkbox"><span class="content listDisplay">${thisArray[i].content}</span>`
        let newListItem = document.createElement('li');
        newListItem.innerHTML = newItem;

        if (thisArray[i].checked === true) {
            newListItem.children[1].setAttribute('class', 'ontent listDisplay strikethrough')
            newListItem.children[0].setAttribute('checked', 'checked')
        }

        newListItem.children[0].addEventListener('click', strikeItem);
        newListItem.children[1].addEventListener('mouseover', hoverEffect);
        list.appendChild(newListItem);
    }
    
    let itemsLeft = document.getElementById('items-left');
    let itemsLeftNumber = 0;
    for (let i in lArray) {
        if (lArray[i].checked !== true ) { itemsLeftNumber++; }}
    itemsLeft.innerHTML = `${itemsLeftNumber} items left`

}

function hoverEffect () {
    let currentClass = this.className;
    this.setAttribute('class', 'hoverClass');
    this.addEventListener('mouseout', function() {
        this.setAttribute('class', currentClass);
    })

}

function strikeItem () {
    for (let i in lArray) {
        if (this.nextElementSibling.textContent === lArray[i].content) {
            lArray[i].checked = (lArray[i].checked === true) ? false : true;
        }
    }
    displayList();
}

function clearCompleted () {
    let tempArray = [];
    for (let i in lArray) { if (lArray[i].checked !== true) { 
        tempArray.push(lArray[i]) 
    }}
    /* Reorder List Items for avoid sorting function not working */
    lArray = tempArray;
    for (let i in lArray) {
        lArray[i].order = i;
    }
    displayList();
}

function sortList() {
    for (let i in lArray) {
        if (lArray[i].checked === true ) {
            lArray[i].order = lArray.length
        }
    }
    lArray.sort(function(arr1, arr2) { return arr1.order - arr2.order });
    displayList();
}