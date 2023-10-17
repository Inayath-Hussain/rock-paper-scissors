// query selectors
// rules
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
    console.log(getScores())
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


function selectSystemChoice() {
    const randomNum = Math.floor(Math.random() * 3)
    return options[randomNum]
}


function computeRound(e) {
    const userChoice = options[e.target.getAttribute('data-option-id')]
    const systemChoice = selectSystemChoice()

    console.log(userChoice, systemChoice)

    const winner = getWinner(userChoice, systemChoice)
    console.log(winner)

    if (winner) {
        // update scoreboard
        scores[winner]++
        computerScoreCard.innerText = scores.computer
        userScoreCard.innerText = scores.user

        // save scores to localStorage
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


function updateUI(userChoice, systemChoice, winner) {
    gameControls.classList.add(['hidden'])

    const playersChoiceElement = {
        user: roundResultContainer.firstElementChild.children.item(1),
        computer: roundResultContainer.lastElementChild.children.item(1)
    }

    // using img which represents their choice
    playersChoiceElement.user.src = `assets/icon-${userChoice}.png`
    playersChoiceElement.user.classList = userChoice

    playersChoiceElement.computer.src = `assets/icon-${systemChoice}.png`
    playersChoiceElement.computer.classList = systemChoice

    // adding box shadow to winner img choice
    if (winner) {
        playersChoiceElement[winner].classList.add('win')
    }

    let firstElement = document.createElement('p')
    let secondElement = document.createElement('p')

    switch (winner) {

        case player.user:
            firstElement.innerText = 'YOU WIN'
            secondElement.innerText = 'AGAINST PC'

            AddNextButton()
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


function AddNextButton() {
    const next = document.createElement('a')
    const button = document.createElement('button')
    button.innerText = 'NEXT'

    next.href = 'you won.html'
    next.id = 'next'
    next.style.display = 'inline-block'
    next.appendChild(button)

    showRulesBtn.insertAdjacentElement('afterend', next)
}


function resetUI() {
    const next = document.getElementById('next')

    if (next) next.remove()
    roundResultContainer.classList.add('hidden')
    gameControls.classList.remove('hidden')
}

