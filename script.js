// query selectors
// rules section
const showRulesBtn = document.getElementById('rules-button')
const closeRulesBtn = document.getElementById('rules-close-button')
const rulesDiv = document.getElementsByClassName('rules').item(0)

// player options
const choiceBtns = document.querySelectorAll('.outer-container img')

// score cards
const computerScoreCard = document.getElementById('computer-score')
const userScoreCard = document.getElementById('user-score')

// containers
const gameControls = document.querySelector('.outer-container')
const roundResultContainer = document.querySelector('.row-flex')
const roundResultText = document.querySelector('.round-result')

// play again
const playAgainBtn = document.getElementById('play-again')

// event listeners
// show and hide rules
showRulesBtn.addEventListener('click', (e) => {
    rulesDiv.classList.toggle('hidden');
})
closeRulesBtn.addEventListener('click', (e) => {
    rulesDiv.classList.toggle('hidden');
})

// play round
choiceBtns.forEach(btn => {
    btn.addEventListener('click', computeRound)
})


playAgainBtn.addEventListener('click', resetUI)


window.addEventListener('load', (e) => {
    computerScoreCard.innerText = scores.computer
    userScoreCard.innerText = scores.user
})


const player = {
    user: 'user',
    computer: 'computer'
}

const scores = getScores() || {
    user: 0,
    computer: 0
}

const options = {
    0: 'rock',
    1: 'scissor',
    2: 'paper'
}


// picks a random number from 0 to 3 and returns mapped option
function selectSystemChoice() {
    const randomNum = Math.floor(Math.random() * 3)
    return options[randomNum]
}


// picks comuter choice and evaluates result
function computeRound(e) {
    const userChoice = options[e.target.getAttribute('data-option-id')]
    const systemChoice = selectSystemChoice()

    const winner = getWinner(userChoice, systemChoice)

    if (winner) {
        // update score
        scores[winner]++
        // update scoreboard
        computerScoreCard.innerText = scores.computer
        userScoreCard.innerText = scores.user

        saveToLocalStorage()
    }

    // update UI
    updateUI(userChoice, systemChoice, winner)
}


function getWinner(userChoice, systemChoice) {

    switch (userChoice) {

        case 'rock':
            switch (systemChoice) {
                case 'paper':
                    return player.computer
                case 'scissor':
                    return player.user
                case 'rock':
                    return null
            }
            break



        case 'scissor':
            switch (systemChoice) {
                case 'rock':
                    return player.computer
                case 'paper':
                    return player.user
                case 'scissor':
                    return null
            }
            break



        case 'paper':
            switch (systemChoice) {
                case 'scissor':
                    return player.computer
                case 'rock':
                    return player.user
                case 'paper':
                    return null
            }
            break
    }
}


function getScores() {
    return JSON.parse(localStorage.getItem('score'))
}

function saveToLocalStorage() {
    localStorage.setItem('score', JSON.stringify(scores))
}


// hides game controller and displays round result
function updateUI(userChoice, systemChoice, winner) {
    gameControls.classList.add(['hidden'])


    // img element of both user and computer choices
    const playersChoiceElement = {
        user: roundResultContainer.firstElementChild.children.item(1),
        computer: roundResultContainer.lastElementChild.children.item(1)
    }

    // changing img source to fit choices picked
    playersChoiceElement.user.src = `assets/icon-${userChoice}.png`
    playersChoiceElement.user.classList = userChoice

    playersChoiceElement.computer.src = `assets/icon-${systemChoice}.png`
    playersChoiceElement.computer.classList = systemChoice

    // adding box shadow to img of winner's choice
    if (winner) {
        playersChoiceElement[winner].classList.add('win')
    }

    let firstElement = document.createElement('p')
    let secondElement = document.createElement('p')

    // updates result text
    switch (winner) {

        case player.user:
            firstElement.innerText = 'YOU WIN'
            secondElement.innerText = 'AGAINST PC'

            addNextButton()
            break

        case player.computer:
            firstElement.innerText = 'YOU LOST'
            secondElement.innerText = 'AGAINST PC'
            break

        case null:
            secondElement.innerText = 'TIE UP'
            break
    }

    const firstChild = roundResultText.children.item(0)
    const secondChild = roundResultText.children.item(1)

    roundResultText.replaceChild(firstElement, firstChild)
    roundResultText.replaceChild(secondElement, secondChild)

    roundResultContainer.classList.remove(['hidden'])
}


function addNextButton() {
    const next = document.createElement('a')
    const button = document.createElement('button')
    button.innerText = 'NEXT'

    next.href = 'you won.html'
    next.id = 'next'
    next.appendChild(button)

    showRulesBtn.insertAdjacentElement('afterend', next)
}


// hides roundResult, display's game controller and removes next button
function resetUI() {
    const next = document.getElementById('next')

    if (next) next.remove()
    roundResultContainer.classList.add('hidden')
    gameControls.classList.remove('hidden')
}

