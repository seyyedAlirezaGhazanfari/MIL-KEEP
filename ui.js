var noteBodyInput = document.getElementById("noteBodyInput");
var noteTitleInput = document.getElementById("noteTitleInput");
var noteFormFooter = document.querySelector("div.formFooter");
noteBodyInput.addEventListener("focus", (e) => {
  noteTitleInput.style.display = "block"
  noteFormFooter.style.display = "flex"
  
  
  
})
noteTitleInput.addEventListener("focus", (e) => {
  noteTitleInput.style.display = "block";
  noteFormFooter.style.display = "flex"
})
