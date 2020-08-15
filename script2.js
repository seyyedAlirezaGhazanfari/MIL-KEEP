
function postArchive(noteTitle, noteBody, color, id,pinned) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/archive", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var data = {
      title: noteTitle,
      text: noteBody,
      color: color,
      pinned : pinned
    };
    xhttp.send(JSON.stringify(data));
  }
  
  function archiveNote(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/notes/${id}`, true);
    xhttp.send();
  }
  
  function getArchive() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        notesToShow = JSON.parse(xhttp.responseText);
        showNotes()
      }
    };
    xhttp.open("GET", "http://localhost:3000/archive", true);
    xhttp.send();
  }
  
function postChangeColor(id,noteBody,noteTitle,pinned,color){
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


  
  