let addBtn = document.querySelector(".newNotes");
let container = document.querySelector(".NotesContainer");


addBtn.addEventListener("click", function() {
    addNote();
});

const NoteSave = ()=>{
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
            (note) => {
                data.push(note.value)
            }
        )
        // console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

let addNote = (content = "") => {
  let note = document.createElement("div");
  note.setAttribute("class", "note");
  note.innerHTML = `<div class="notehead">
              <span>Note</span>
              <div class="icon">
              <i class="SaveNote fa-solid fa-floppy-disk"></i>
              <i class="deleteNote fa-solid fa-trash"></i>
              </div>
            </div>
            <textarea name="note" id="inpNotes"></textarea>`;
   

            let textarea = note.querySelector("textarea");
            textarea.value = content;


    let deleteNote = note.querySelector(".deleteNote");
        deleteNote.addEventListener("click",()=>{
            let confirmation = confirm("Are You sure Want to delete the note ?");
            if(confirmation === true){
                note.remove();
                NoteSave();
            }
        });
    
    let saveNote = note.querySelector(".SaveNote");
    saveNote.addEventListener("click", function(){
            NoteSave();
    });
    
    textarea.addEventListener(
        "focusout",
        function() {
            NoteSave();
        }
    )
    container.appendChild(note);
    NoteSave();
    
};
 
(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()




