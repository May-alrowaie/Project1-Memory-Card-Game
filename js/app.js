/*-------------------------------- Constants --------------------------------*/
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const maxWrongMatches = 30
/*---------------------------- Variables (state) ----------------------------*/
let randomArr = arr.sort(() => Math.random() - 0.5)
document.querySelector('td[id="0"] span').innerText = randomArr[0]

let score = 0
let wrongMatches = 0
let matchedPairs = 0

/*------------------------ Cached Element References ------------------------*/
const restartBtn = document.getElementById("restart-btn")
const scoreDisplay = document.getElementById("score")
const winnerMessage = document.getElementById("winner")
const loserMessage = document.getElementById("loser")

/*-------------------------------- Functions --------------------------------*/
randomArr.forEach((item, i) => {
  let ele = document.querySelector(`td[id="${i}"] span`)
  if (ele) {
    ele.innerText = item
  }
})

let counter = 0
let prev

function clickTd(id) {
  let currentEle = document.querySelector(`td[id="${id}"] span`)
  if (currentEle) {
    currentEle.style.display = "block"
  }

  if (counter === 0) {
    prev = id
    counter++
    return
  } else {
    let prevEle = document.querySelector(`td[id="${prev}"] span`)

    if (currentEle.innerText === prevEle.innerText) {
      currentEle.style.color = "gold"
      prevEle.style.color = "gold"
      currentEle.style.textDecoration = "line-through"
      prevEle.style.textDecoration = "line-through"
      matchedPairs++
      score++
      scoreDisplay.innerText = `Score: ${score}`

      if (matchedPairs === arr.length / 2) {
        winnerMessage.innerText = "Congratulations! You have a winner! 🎉"
        winnerMessage.style.display = "block"
        endGame()
      }
      counter = 0
      prev = ""
    } else {
      wrongMatches++
      if (wrongMatches >= maxWrongMatches) {
        loserMessage.innerText = "You lost! 😢 Restarting game..."
        loserMessage.style.display = "block"
        setTimeout(restart, 3000)
      } else {
        scoreDisplay.innerText = `Score: ${score} (Wrong Matches: ${wrongMatches})`
      }

      setTimeout(() => {
        if (currentEle) currentEle.style.display = "none"
        if (prevEle) prevEle.style.display = "none"

        prev = ""
        counter = 0
      }, 500)
    }
  }
}

function endGame() {
  const cells = document.querySelectorAll("td span")
  cells.forEach((cell) => {
    cell.onclick = null
  })
}
function restart() {
  location.reload()
}
/*----------------------------- Event Listeners -----------------------------*/
restartBtn.addEventListener("click", restart)
