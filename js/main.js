let red = document.querySelector('.red')
let blue = document.querySelector('.blue')
let green = document.querySelector('.green')
let yellow = document.querySelector('.yellow')
let squares = [red, blue, green, yellow]
let is_ai_turn = true
let ai_moves = []
let num_moves = 0
let next_color = 0

const debug = () => {
  console.log(
    `Num_moves: ${num_moves},
     Next color: ${next_color},
     Ai moves: ${ai_moves.length}`
  )
  ai_moves.forEach(i => console.log(i.className[5]))
}

const ai_take_turn = () => {
  let move = Math.floor(Math.random()*4)
  ai_moves.push(squares[move])
  is_ai_turn = false
  num_moves = ai_moves.length
  debug()
}

ai_take_turn()

squares.forEach(s => {
  s.addEventListener('click', () => {
    if (s !== ai_moves[next_color]) {
      console.log('Wrong')
      next_color = 0
      num_moves = 0
      ai_moves = []
      ai_take_turn()
    }
    else {
      console.log('Correct')
      next_color += 1
      if (next_color >= num_moves) {
        next_color = 0
        ai_take_turn()
      }
    }
  })
})
