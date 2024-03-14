document.addEventListener('DOMContentLoaded', function() {
  document.getElementsByTagName('p')[0].addEventListener('click', changeTheme);
  document.getElementById('submit').addEventListener('click', function(event) {
      let userInput = document.getElementById('newUserItem').value;
      addItem(userInput); });
  document.getElementById('newUserItem').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
      let userInput = document.getElementById('newUserItem').value;
      addItem(userInput); }});
  
  lightMode();
  addItem('Add a New ToDo List Item Above')
  addItem('Complete Finished Ones by Checking the Box')
})

let list = document.getElementById('list');
let lArray = [];

function addItem (userInput) {
  let newItem = document.createElement('span');
  newItem.addEventListener('mouseover', colorItem);
  newItem.addEventListener('mouseout', colorItem);
  newItem.addEventListener('click', editItem);
  let newCheckBox = document.createElement('input');
  newCheckBox.setAttribute('class', 'ch');
  newCheckBox.type = "checkbox";
  newCheckBox.addEventListener('click', remItem);
  let newListItem = document.createElement('li');

  lArray.unshift(userInput);
  newItem.textContent = lArray[0];
  console.log(lArray);

  newListItem.appendChild(newCheckBox);
  newListItem.appendChild(newItem);
  list.appendChild(newListItem);
   
  document.getElementById('newUserItem').value = "";
  document.getElementById('newUserItem').focus();
}


function remItem() {
  this.parentNode.style.textDecoration = this.parentNode.style.textDecoration == 'line-through' ? 'none' : 'line-through';  
}

function colorItem() {
  this.style.color = this.style.color === 'rgb(219, 83, 83)' ? 'white' : 'rgb(219, 83, 83)';
}

function changeTheme() {
  let bck = document.body.style.backgroundColor;
  ((bck === '') || (bck === "whitesmoke")) ? darkMode() : lightMode()
}

function editItem() {
  let replace = document.createElement('input');
  replace.type = "text";
  replace.id = "editing";
  replace.value = this.textContent;
  this.parentNode.appendChild(replace);
  this.remove();
  document.getElementById('editing').focus();

  document.getElementById('editing').addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
      let content = document.getElementById('editing').value;
      let newItem = document.createElement('span');
      newItem.addEventListener('mouseover', colorItem);
      newItem.addEventListener('mouseout', colorItem);
      newItem.addEventListener('click', editItem);

      lArray.push(content);
      newItem.textContent = lArray[0];
       this.parentNode.appendChild(newItem);
      this.remove();
    }})
  }

function darkMode() {
  document.body.style.backgroundColor = 'rgb(67, 62, 62)';
  for (i = 0; i < list.children.length; i++) {
    list.children[i].style.backgroundColor = 'whitesmoke';
    list.children[i].children[1].style.color = 'rgb(67, 62, 62)';
      }
  } 

function lightMode() {
  document.body.style.backgroundColor = 'whitesmoke';
  for (i = 0; i < list.children.length; i++) {
    list.children[i].style.backgroundColor = 'rgb(67, 62, 62)';
    list.children[i].children[1].style.color = 'whitesmoke';
      }
  // console.log(document.body.outerHTML);
}

