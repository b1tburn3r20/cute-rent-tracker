import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const rentEntriesListInDB = ref(database, "chores")

const numberInput = document.getElementById('number-input')
const textInput = document.getElementById('text-input')
const addButton = document.getElementById('add-button')

addButton.addEventListener('click', function(){
    // push(rentEntriesListInDB, textInput.value)
    console.log(textInput.value)
})
