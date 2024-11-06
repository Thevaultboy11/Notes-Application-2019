
const public = true
let data
const processData = () => {
    data =  '12345678'
}
processData()
console.log(data)
const getSavedNotes = () => {

    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    }catch(e){
        return []
    }
    
}
let EditedChg = ( note) => `Last edited ${moment(note.updatedAt).fromNow()}`


let changeTime = (time) => time = moment().valueOf()

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) =>  {
        return note.id  === id 
    }) 
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

const generateNoteDom = (note) => {
    
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
    if(note.title.length > 0 ){
        textEl.textContent = note.title
             
    }else{
        textEl.textContent = 'Unnamed note'   
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    
    // Set up the link 
    noteEl.setAttribute('href', `edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    //Status message
    statusEl.textContent = EditedChg(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

const sortNotes = (notes, sortBy) => {
   console.log(sortBy)
    if(sortBy === 'by_edited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1 
            }else if(a.updatedAt = b.updatedAt){
                return 0
            }
        })
    }else if(sortBy === 'by_created'){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else if(a.createdAt = b.createdAt){
                return 0
            }
        })
    }else if(sortBy === 'by_alphabetically'){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1 
            }else if(a.title.toLowerCase() = b.title.toLowerCase()){
                return 0 
            }
        })
    }
    else{
            return notes
    }
}

const renderNotes = (notes, filter) => {
    notesEl =  document.querySelector('#notes')
    notes = sortNotes(notes, filter.sortBy)
    const filteredNotes = notes.filter((note) => note.title.includes(filter.text))
    
    notesEl.innerHTML = ''

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
        
            let noteEL = generateNoteDom(note)
    
            notesEl.appendChild(noteEL)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

    
}