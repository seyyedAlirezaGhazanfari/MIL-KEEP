function openNav() {
  document.getElementsByClassName("sidebar")[0].style.width = "200px";
}

function closeNav() {
  document.getElementsByClassName("sidebar")[0].style.width = "0";
}

var sidebarItems = document.getElementsByClassName("sidebarItem");

for (let i = 0; i < sidebarItems.length; i++) {
  if (screen.width <= 600) {
    sidebarItems[i].addEventListener("click", (e) => {
      e.preventDefault();
      closeNav();
    });
  }
}

var notesSidebarItem = sidebarItems[0];
var archiveSidebarItem = sidebarItems[1];
var binSidebarItem = sidebarItems[2]

binSidebarItem.addEventListener('click' , (e)=>{
  e.preventDefault()

  binSidebarItem.classList.add('active')
  archiveSidebarItem.classList.remove('active')
  notesSidebarItem.classList.remove('active')
 document.getElementsByClassName('noteForm')[0].style.display = 'none'

  getBinNotes()
})

notesSidebarItem.addEventListener('click', (e) => {
  e.preventDefault()
  notesSidebarItem.classList.add('active')
  archiveSidebarItem.classList.remove('active')
  binSidebarItem.classList.remove('active')
  document.getElementsByClassName('noteForm')[0].style.display = 'block'

  getNotes()
})

archiveSidebarItem.addEventListener('click', (e) => {
  e.preventDefault()

  archiveSidebarItem.classList.add('active')
  notesSidebarItem.classList.remove('active')
  binSidebarItem.classList.remove('active')
  document.getElementsByClassName('noteForm')[0].style.display = 'none'
  getArchive()
})


var notesToShow = [];

var notesContainer = document.getElementsByClassName("notes")[0];

function addNote(title, body, color, id,pinned) {
  var noteCard = document.createElement("div");
  noteCard.style.backgroundColor = color;

  var titleText = document.createTextNode(title);
  var noteTitle = document.createElement("h4");
  noteTitle.appendChild(titleText);
  noteTitle.style.marginTop = 0;

  var bodyText = document.createTextNode(body);
  var noteBody = document.createElement("span");
  noteBody.appendChild(bodyText);

  var noteFooter = document.createElement("div");
  noteFooter.style.display = "flex";
  noteFooter.style.flexDirection = "row";
  noteFooter.style.justifyContent = "center";
  noteFooter.style.marginLeft = 0;

  var pinButton = document.createElement("button");
  var pinIcon = document.createElement("i");
  pinButton.className = "iconButton";
  pinIcon.className = "material-icons";
  var pinText = document.createTextNode("push_pin");
  pinIcon.appendChild(pinText);
  pinButton.appendChild(pinIcon);
  noteFooter.appendChild(pinButton);

  var pinnedIcon = document.createElement("i")
  pinnedIcon.className = "material-icons"
  var signeText = document.createTextNode("check_circle")
  pinnedIcon.appendChild(signeText)
  noteFooter.appendChild(pinnedIcon)
  if(!pinned){
  pinnedIcon.style.display = "none"
  }
  
  pinButton.addEventListener("click",(e)=>{
    e.preventDefault()
    var pinChanger = true
    if(pinned==false){
      pinChanger = true
    }else{
        pinChanger = false
    }
    if(!pinChanger){
      pinnedIcon.style.display = "none"
    }else{
      pinnedIcon.style.display = "flex"
    }
     postPinned(id,pinChanger,color,title,body)
  })

  var archiveButton = document.createElement("button");
  archiveButton.addEventListener("click", (e) => {
    e.preventDefault()
    postArchive(title, body, color, id,pinned);
    archiveNote(id);
  });
  var removeButton = document.createElement("button")
  removeButton.addEventListener("click",(e)=>{
    deleteNoteFromNotes(id)
    postDeletedNoteToBIN(title, body, color, id,pinned)
  })
  var removeIcon = document.createElement("i")
  var archiveIcon = document.createElement("i");
  removeButton.className = "iconButton"
  archiveButton.className = "iconButton";
  removeIcon.className = "material-icons"
  archiveIcon.className = "material-icons";
  var removeText = document.createTextNode("delete")
  var archiveText = document.createTextNode("archive");
 
 
 
  removeIcon.appendChild(removeText)
  removeButton.appendChild(removeIcon)
  archiveIcon.appendChild(archiveText);
  archiveButton.appendChild(archiveIcon);
  noteFooter.appendChild(archiveButton);
  noteFooter.appendChild(removeButton)
  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteBody);
  noteCard.appendChild(noteFooter);

  notesContainer.insertBefore(noteCard, notesContainer.firstChild);
}

var selectedColor = null;
var colorPickerButton = document.getElementsByClassName("iconButton")[1];
colorPickerButton.addEventListener("click", (e) => {
  e.preventDefault();
  var picker = new Picker(colorPickerButton);
  picker.onDone = function (color) {
    selectedColor = color.hex;
  };
});

var noteTitleInput = document.getElementById("noteTitleInput");
var noteBodyInput = document.getElementById("noteBodyInput");

function deleteNoteFromNotes(id){
  fetch(`http://localhost:3000/notes/${id}`,{
    method:"DELETE"
  }).then((resposne)=>console.log("success"))
  .catch((err)=>console.log("error"))
}
function postDeletedNoteToBIN(titlen, bodyn, color, idn,pinned){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/Bin", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
    
    title: titlen,
    text: bodyn,
    color: color,
    pinned : pinned
  };
  xhttp.send(JSON.stringify(data));
}


function submitForm(e) {
  e.preventDefault();
  if (noteTitleInput.value !== "" || noteBodyInput !== "") {
    addNote(noteTitleInput.value, noteBodyInput.value, selectedColor,"false");
    postNote(noteTitleInput.value, noteBodyInput.value, selectedColor);
    noteTitleInput.value = "";
    noteBodyInput.value = "";
    selectedColor = null;
  }
}

function showNotes() {
  notesContainer.innerHTML = "";
  notesToShow.forEach((note) =>
    addNote(note.title, note.text, note.color, note.id,note.pinned)
  )
}

var noteFormSubmitButton = document.querySelector("input[type=submit]");
noteFormSubmitButton.addEventListener("click", submitForm);

function getBinNotes(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      notesToShow = JSON.parse(xhttp.responseText);
      showNotes()
    }
  };
  xhttp.open("GET", "http://localhost:3000/Bin", true);
  xhttp.send();
}

function getNotes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      notesToShow = JSON.parse(xhttp.responseText);
      showNotes()
    }
  };
  xhttp.open("GET", "http://localhost:3000/notes", true);
  xhttp.send();
}

getNotes();

function postNote(noteTitle, noteBody, color) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/notes", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
    title: noteTitle,
    text: noteBody,
    color: color,
    pinned :false
  };
  xhttp.send(JSON.stringify(data));
}

function postPinned(id,pinned,color,noteTitle,noteBody){
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/notes/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
    title: noteTitle,
    text: noteBody,
    color: color,
    pinned : pinned
  };
  xhttp.send(JSON.stringify(data));
}
