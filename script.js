let lArray = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggleTheme').addEventListener('click', function() {
        toggleTheme()
    })
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
    for (i in lArray) {
        if (lArray[i].content === userInput) {
            alert("You've already added this item :)")
            clearFocus();
            return;
        }
    }

    let priorityStatus = document.getElementById('priority-button').checked;
    // console.log("This item had priority = " + priorityStatus)
    let order = lArray.length;
    lArray.push( {
        'order' : order,
        'content' : userInput,
        'checked' : false,
        'priority' : priorityStatus
     });
    displayList();
    clearFocus();

}

function clearFocus() {
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').focus();
    document.getElementById('priority-button').checked = false;
}

function displayList(type) {

    /* Reorder List Items for avoid sorting function not working */
    for (let i in lArray) {
        lArray[i].order = i;
    }

    // console.log("=============");
    // for (let i in lArray) {
    //     console.log("\n");
    //     console.log(lArray[i].order);
    //     console.log(lArray[i].content);
    //     console.log(lArray[i].checked);
    //     console.log(lArray[i].priority);
    // }   
    // console.log("=============");

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
    /* Check Dark/Light Theme before displaying items */
    let listDisplay = "";
    let darkMode = (document.body.className === 'body-dark')
    if (darkMode) { listDisplay = 'listDisplay-dark' } else { listDisplay = 'listDisplay-light' }
    console.log(listDisplay);
    console.log(document.body.className);

    for (i = 0; i < thisArray.length; i++) {
        let newItem = `<input type="checkbox" class="checkbox"><span class="content ${listDisplay}">${thisArray[i].content}</span>
                        <span class="priority"></span><span class="not-priority">0</span><span class="remove">X</span>`
        let newListItem = document.createElement('li');
        newListItem.innerHTML = newItem;

        if (thisArray[i].checked === true) {
            newListItem.children[1].setAttribute('class', `content ${listDisplay} strikethrough`)
            newListItem.children[0].setAttribute('checked', 'checked')
        }

        if (thisArray[i].priority === true) {
            newListItem.children[3].setAttribute('class', 'priority')
        }

        newListItem.children[0].addEventListener('click', strikeItem);
        newListItem.children[1].addEventListener('mouseover', hoverEffect);
        newListItem.children[1].addEventListener('click', editItemText);
        newListItem.children[4].addEventListener('click', removeItem);
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
            lArray[i].priority = false;
        }
    }
    displayList();
}

function removeItem () {
    let tempArray = [];
    for (let i in lArray) {
        if (this.previousElementSibling.previousElementSibling.previousElementSibling.textContent !== lArray[i].content) {
            tempArray.push(lArray[i]) 
    }}
    lArray = tempArray;
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
        } else if (lArray[i].priority === true ) {
            lArray[i].order = i - lArray.length;
        }
    }
    lArray.sort(function(arr1, arr2) { return arr1.order - arr2.order });
    displayList();
}

function editItemText() {
    let numToChange = 0;
    for (let i in lArray) {
        if (lArray[i].content == this.textContent) { numToChange = i}
    }

    let replace = document.createElement('input');
    replace.type = "text";
    replace.id = "editing";
    replace.setAttribute('class', 'listDisplay')
    replace.value = this.textContent;
    this.parentNode.appendChild(replace);
    this.remove();
    document.getElementById('editing').focus();
  
    document.getElementById('editing').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        let newContent = document.getElementById('editing').value; 
        lArray[numToChange].content = newContent;
        displayList();
    }})
}

function toggleTheme() {
    let darkMode = (document.body.className === 'body-dark')
    if (darkMode) {
        document.body.setAttribute('class', 'body-light')
        document.body.children[0].setAttribute('class', 'main-light')
    } else {
        document.body.setAttribute('class', 'body-dark')
        document.body.children[0].setAttribute('class', 'main-dark')
    }
    displayList();
}