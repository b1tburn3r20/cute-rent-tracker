import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const rentEntriesListInDB = ref(database, "chores")

const numberInput = document.getElementById('number-input')
const textInput = document.getElementById('text-input')
const addButton = document.getElementById('add-button')
const choreList = document.getElementById('chore-list')
const rentNumberEl = document.getElementById('rent-number')
const rentResetButton = document.getElementById('reset-rent')
rentNumberEl.textContent = 250


function resetInputFills(){
    numberInput.value = ''
    textInput.value = ''
}

function clearChoreList(){
    choreList.textContent = ''
}


onValue(rentEntriesListInDB, function(snapshot){
    if(snapshot.exists()){
        clearChoreList()
        let choresArray = Object.entries(snapshot.val())
        choresArray.reverse()
        rentNumberEl.textContent = 250;
        for (const chore of choresArray){
            createChoreItem(chore)
            calculateRent(chore)
        }
    }
    else {
        let newEl = document.createElement('li')
        newEl.textContent = `Do chores to work off rent`
        newEl.className = 'no-chores-done'
        choreList.appendChild(newEl)
    }
})
function createChoreItem(choreValue){

    let newEl = document.createElement('li')
    newEl.textContent = `Complete: ${choreValue[1].chore} for $${choreValue[1].number}`
    newEl.className = 'chore-item'
    choreList.appendChild(newEl)
    newEl.addEventListener("click", function(){
        let exactLocationOfChoresList = ref(database, `chores/${choreValue[0]}`)
        remove(exactLocationOfChoresList)

    })
    
}



addButton.addEventListener('click', function(){
    let textValue = textInput.value.trim()
    let numberValue = numberInput.value.trim()
    if (textValue !== "" && numberValue !== ''){
        const data = {
            number: numberInput.value,
            chore: textInput.value
        }
        push(rentEntriesListInDB, data)
        resetInputFills()
    }
    
})
function calculateRent(choreValue){
    let currentRent = parseInt(rentNumberEl.textContent)
    for (const number of choreValue[1].number){
        let num = parseInt(number)
        currentRent = currentRent - num
    }
    rentNumberEl.textContent = currentRent

}
function resetRent(snapshot){
    let choresArray = Object.entries(snapshot.val())
    for (let chore of choresArray){
        let exactLocationOfChore = ref(database, `chores/${chore[0]}`)
        remove(exactLocationOfChore)
    }
}

rentResetButton.addEventListener('click', function(){
    onValue(rentEntriesListInDB, function(snapshot){
        resetRent(snapshot)
        location.reload()
    })
})