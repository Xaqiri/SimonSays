let score = document.querySelector('.score')
let start_button = document.querySelector('.start_button')
let game_over = document.querySelector('.game_over')
let game_board = document.querySelector('.container')
let green = document.querySelector('.green')
let red = document.querySelector('.red')
let blue = document.querySelector('.blue')
let yellow = document.querySelector('.yellow')
let squares = [red, blue, green, yellow]
let green_audio = new Audio('sounds/100hz_300hz.mp3')
let red_audio = new Audio('sounds/200hz_400hz.mp3')
let blue_audio = new Audio('sounds/300hz_500hz.mp3')
let yellow_audio = new Audio('sounds/400hz_600hz.mp3')
let is_ai_turn = false
let ai_moves = []
let num_moves = 0
let next_color = 0
let game_is_playing = false

const debug = () => {
  console.log(
    `Num_moves: ${num_moves},
     Next color: ${next_color},
     Ai moves: ${ai_moves.length},
     Ai turn: ${is_ai_turn}`
  )
  ai_moves.forEach(i => console.log(i.className[5]))
}

const add_events = () => {
  squares.forEach(s => {
    s.addEventListener('mousedown', () => {
      s.classList.add('hover')
      if (s === red) red_audio.play()
      if (s === blue) blue_audio.play()
      if (s === green) green_audio.play()
      if (s === yellow) yellow_audio.play()
    })
    s.addEventListener('mouseup', () => {
      s.classList.remove('hover')
    })
    if (!is_ai_turn) {
      s.addEventListener('click', () => {
        // Player gave wrong answer
        if (s !== ai_moves[next_color]) {
          if (game_is_playing) {
            stop_game()
            game_board.style.display = 'none'
            game_over.style.display = 'block'
            game_is_playing = false
          }
        }
        // Player gave correct answer
        else {
          next_color += 1
          if (next_color >= num_moves) {
            score.innerHTML = num_moves
            next_color = 0
            sleep(500).then(() => ai_take_turn())
          }
        }
      })
    }
  })
}

const highlight = i => {
  ai_moves[i].classList.add('hover')
  let sound = ai_moves[i]//.classList[1]+'_audio'
  if (sound === red) red_audio.play()
  if (sound === blue) blue_audio.play()
  if (sound === green) green_audio.play()
  if (sound === yellow) yellow_audio.play()
  sleep(200).then(() => {
    ai_moves[i].classList.remove('hover')
    sleep(100).then(() => {
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
  is_ai_turn = false
}

const start_game = () => {
  reset_game()
  game_board.style.display = 'flex'
  game_over.style.display = 'none'
  game_is_playing = true;
  start_button.innerHTML = 'Stop Game'
  is_ai_turn = true;
  ai_take_turn()
}

const stop_game = () => {
  reset_game()
  game_is_playing = false;
  start_button.innerHTML = 'Start Game'
  is_ai_turn = false;
}

add_events()
start_button.addEventListener('click', () => {
  if (!game_is_playing) {
    start_game()
  } else {
    stop_game()
  }
})
