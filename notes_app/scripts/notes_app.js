
let notes = getSavedNotes()


const filters = {
    search_text: '',
    sortBy: 'byEdited'
}


renderNotes(notes, filters)

document.querySelector('#create_note').addEventListener('click' , (e) => {
    
    createdAt = moment().valueOf()
    updatedAt = moment().valueOf()
    id = uuidv4()

    notes.push({
        createdAt: createdAt,
        updatedAt: updatedAt,
        id: id,
        title: '',
        body: ''
    })
    saveNotes(notes)
    
    location.assign(`edit.html#${id}`)
})
document.querySelector('#src_text').addEventListener('input', (e) => {
    filters.text =  e.target.value.toLowerCase()
    renderNotes(notes, filters)
    
})  

document.querySelector('#filter_by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        let notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

