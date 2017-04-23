let score = document.querySelector('.score')
let start_button = document.querySelector('.start_button')
let red = document.querySelector('.red')
let blue = document.querySelector('.blue')
let green = document.querySelector('.green')
let yellow = document.querySelector('.yellow')
let squares = [red, blue, green, yellow]
let is_ai_turn = false
let ai_moves = []
let num_moves = 0
let next_color = 0
let game_is_playing = false

const debug = () => {
  console.log(
    `Num_moves: ${num_moves},
     Next color: ${next_color},
     Ai moves: ${ai_moves.length}`
  )
  ai_moves.forEach(i => console.log(i.className[5]))
}

const highlight = i => {
  ai_moves[i].classList.add('hover')
  sleep(500).then(() => {
    ai_moves[i].classList.remove('hover')
    sleep(200).then(() => {
      i++
      if (i < ai_moves.length) {
        highlight(i)
      }
    })
  })
}

// Sets a delay between actions
// Copied from StackOverflow, I didn't write this
const sleep = ms => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const ai_take_turn = () => {
  let move = Math.floor(Math.random()*4)
  ai_moves.push(squares[move])
  num_moves = ai_moves.length
  let i = 0
  highlight(i)
  is_ai_turn = false
}

const reset_game = () => {
  ai_moves = []
  num_moves = 0
  next_color = 0
  score.innerHTML = 0
}

const start_game = () => {
  reset_game()
  is_ai_turn = true;
  ai_take_turn()
}

squares.forEach(s => {
  s.addEventListener('mousedown', () => {
    s.classList.add('hover')
  })
  s.addEventListener('mouseup', () => {
    s.classList.remove('hover')
  })
  if (!is_ai_turn) {
    s.addEventListener('click', () => {
      if (s !== ai_moves[next_color]) {
        if (game_is_playing) {
          start_game()
        }
      }
      else {
        next_color += 1
        if (next_color >= num_moves) {
          score.innerHTML = num_moves
          next_color = 0
          ai_take_turn()
        }
      }
    })
  }
})

start_button.addEventListener('click', () => {
  if (!game_is_playing) {
    game_is_playing = true;
    start_button.innerHTML = 'Stop Game'
    start_game()
  } else {
    game_is_playing = false;
    start_button.innerHTML = 'Start Game'
    reset_game()
  }
})
