
document.addEventListener('DOMContentLoaded', function () {
    let monsterContainer = document.querySelector('#monster-container')
    let formContainer = document.querySelector('#create-monster')
    let backButton = document.querySelector('#back')
    let forwardButton = document.querySelector('#forward')
    let pageNumber = 1


    function getAllMonsters() {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(res => res.json())
        .then(monsterData => renderMonsters(monsterData))
    }

    getAllMonsters()
    createForm()
    createMonster()

    forwardButton.addEventListener('click', function () {
        monsterContainer.innerHTML = " "
        pageNumber++
        getAllMonsters()
    })

    backButton.addEventListener('click', function () {
        monsterContainer.innerHTML = " "
        pageNumber--
        getAllMonsters()
    })

    
    function createForm() {
        let newForm = document.createElement('form')
        newForm.id = 'monster-form'


        let nameInput = document.createElement('input')
        let ageInput = document.createElement('input')
        let descriptionInput = document.createElement('input')
        createMonsterButton = document.createElement('button')

        nameInput.id = 'name'
        nameInput.placeholder = 'name...'

        ageInput.id = 'age'
        ageInput.placeholder = 'age...'

        descriptionInput.id = 'description'
        descriptionInput.placeholder = 'description...'

        createMonsterButton.innerHTML = 'Create'
        
        newForm.append(nameInput, ageInput, descriptionInput, createMonsterButton)

        formContainer.append(newForm)
        console.log(formContainer)
    }

    function createMonster() {
        let monsterForm = document.getElementById('monster-form')
        monsterForm.addEventListener('submit', function (e) {
            e.preventDefault()
            let newMonster = document.createElement('div')
            let newMonsterName = document.createElement('h2')
            let newMonsterAge = document.createElement('h4')
            let newMonsterBio = document.createElement('p')

            newMonsterName.innerHTML = `${e.target.name.value}`
            newMonsterAge.innerHTML = `Age: ${e.target.age.value}`
            newMonsterBio.innerHTML = `Bio: ${e.target.description.value}`
            newMonster.append(newMonsterName, newMonsterAge, newMonsterBio)
            monsterContainer.appendChild(newMonster)
            console.log(e.target.name)
            console.log(monsterContainer)
        })
        console.log(monsterForm)
        
    }
   



    function renderMonsters(monsterData) {
        monsterData.forEach(monster => {
            let newMonster = document.createElement('div')
            let newMonsterName = document.createElement('h2')
            let newMonsterAge = document.createElement('h4')
            let newMonsterBio = document.createElement('p')

            newMonsterName.innerHTML = `${monster['name']}`
            newMonsterAge.innerHTML = `Age: ${monster['age']}`
            newMonsterBio.innerHTML = `Bio: ${monster['description']}`
            newMonster.append(newMonsterName, newMonsterAge, newMonsterBio)
            monsterContainer.appendChild(newMonster)
            // console.log(newMonster)
        });
        // console.log(monsterContainer)
        // console.log(monsterData)
    }
})