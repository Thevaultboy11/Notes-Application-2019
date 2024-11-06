const timeTxt = document.querySelector('#timeSp')
const TitleEL = document.querySelector('#note_title')
const BodyEL = document.querySelector('#note_body')
const noteID = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteID)
//function
//timeTxt.value = fromNow()
if(!note){
    location.assign('index.html')
}
EditedChg(timeTxt, note)
TitleEL.value = note.title
BodyEL.value = note.body

TitleEL.addEventListener('input', (e) => {
   
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    EditedChg(timeTxt, note)
    saveNotes(notes)
    
})


BodyEL.addEventListener('input', (e) => {
    
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    EditedChg(timeTxt, note)
    saveNotes(notes)
    
})  

document.querySelector('#remove_button').addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('index.html')
})

window.addEventListener('storage', (e) =>{
    
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteID)
    }

    if(!note){
        location.assign('index.html')
    }
    EditedChg(timeTxt, note)
    TitleEL.value = note.title  
    BodyEL.value = note.body
})