var noteBodyInput = document.getElementById("noteBodyInput");
var noteTitleInput = document.getElementById("noteTitleInput");
var noteFormFooter = document.querySelector("div.formFooter");
var noteInput = document.querySelector("noteForm")
var active  = document.activeElement
var fomr = document.getElementById("form")
noteBodyInput.addEventListener("focus", (e) => {
  noteTitleInput.style.display = "block";

  noteFormFooter.style.display = "flex"
  
})
noteTitleInput.addEventListener("focus", (e) => {
  noteTitleInput.style.display = "block";
  noteFormFooter.style.display = "flex"
})
