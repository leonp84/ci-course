let list = document.getElementById('list');

function addItem () {
  let newItem = document.createElement('li');
  newItem.addEventListener('click', remItem);
  newItem.id = 0;
  let userInput = document.getElementById('newUserItem').value;
  newItem.innerHTML = userInput;
  
  list.appendChild(newItem);
  document.getElementById('newUserItem').value = "";
}

function remItem() {
  this.remove();
}

document.getElementById('submit').addEventListener('click', addItem);
document.getElementById('newUserItem').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') { addItem(); }});

// console.log(document.body.outerHTML)