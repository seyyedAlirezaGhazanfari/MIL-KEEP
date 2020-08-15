var noteBodyInput = document.getElementById("noteBodyInput");
var noteTitleInput = document.getElementById("noteTitleInput");
var noteFormFooter = document.querySelector("div.formFooter");
noteBodyInput.addEventListener("focus", () => {
  noteTitleInput.style.display = "block";
  noteFormFooter.style.display = "flex";
  noteBodyInput.focus();
});
noteBodyInput.addEventListener("focusout",()=>{
  noteTitleInput.style.display = "none"
  noteFormFooter.style.display = "none"
})
