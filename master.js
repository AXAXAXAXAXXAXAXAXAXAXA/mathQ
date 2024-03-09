let signs = ['+', '-', '*', '/'] 
let main = document.querySelector('.main_ecran') 
let container_start_h3 = document.querySelector('.main') 
let start_ecran = document.querySelector('.start_ecran') 
let question = document.querySelector('.nPUMEP') 
let question_field = document.querySelector('.nPUMEP') 
let answer_buttons = document.querySelectorAll('.BAPUAHT') 
let start_button = document.querySelector('.start_button') 
let cookie = false
let cookies = document.cookie.split('; ')
for (let i = 0; i< cookies.length; i += 1){
    if (cookies[i].split('=')[0]=='numbers_high_score') {
        cookie = cookies[i].split('=')[1]
        break
    }
}

if (cookie){
     let data = cookie.spit('/')
    container_start_h3.innerHTML = `<h3>В прошлый раз вы дали $(data[1]) правильных ответов из $(data[0]). точность - ${Math.round(data[1]*100/data[0])}%.</h3>`
 }
function randint(min, max) { 
    return Math.round(Math.random() * (max - min) + min) 
} 
 
 
function getRandomSign() { 
    return signs[randint(0, 3)] 
} 
function shuffle(array) { 
  let currentIndex = array.length,  randomIndex; 
 
 
  while (currentIndex != 0) { 
    randomIndex = Math.floor(Math.random() * currentIndex); 
    currentIndex--; 
    [array[currentIndex], array[randomIndex]] = [ 
      array[randomIndex], array[currentIndex]]; 
  } 
 
 
  return array; 
} 
 
 
class Question { 
    constructor() { 
        let a = randint(1, 15) 
        let b = randint(1, 15) 
        let sign = getRandomSign() 
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') { this.correct = a + b } 
        else if (sign == '-') { this.correct = a - b } 
        else if (sign == '*') { this.correct = a * b } 
        else if (sign == '/') { this.correct = a / b } 
        this.answers = [ 
            randint(this.correct - 20, this.correct - 1), 
            randint(this.correct - 20, this.correct - 1), 
            this.correct, 
            randint(this.correct + 1, this.correct + 20), 
            randint(this.correct + 1, this.correct + 20), 
        ] 
        shuffle(this.answers); 

        for(let j = 0; j < this.answers.length; j++)
            if(!Number.isInteger(this.answers[j]))
                this.answers[j] = this.answers[j].toFixed(2)
    } 

    
 
 
    display () { 
        question_field.innerHTML = this.question 
        for (let i = 0; i < this.answers.length; i += 1) { 
            answer_buttons[i].innerHTML = this.answers[i] 
        } 
    } 
} 
 
 
let current_question 
let correct_varianty
let total_varianty 
start_button.addEventListener('click', function() { 
    main.style.display = 'flex' 
    start_ecran.style.display = 'none' 
    current_question = new Question() 
    current_question.display() 
 
 
    correct_answers_given = 0 
    total_answers_given = 1 
 
 
    setTimeout(function() { 
        let new_cookie = `numbers_high_score=${total_answers_given}/${correct_answers_given};
        max-age=10000000000`
        document.cookie = new_cookie
main.style.display = 'none' 
start_ecran.style.display = 'flex' 

    alert(`Вы дали ${correct_answers_given} правильных ответов из ${total_answers_given}. Точность - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.`)
    }, 10000) 
    container_start_h3.innerHTML = `<h3>Вы дали ${correct_answers_given} правильных ответов из ${total_answers_given}. Точность - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.</h3>`
}) 
 
 
for (let i = 0; i < answer_buttons.length; i += 1) { 
    answer_buttons[i].addEventListener('click', function() { 
        if (answer_buttons[i].innerHTML == current_question.correct) { 
            correct_answers_given += 1 
            answer_buttons[i].style.background = '#00FF00' 
            anime({ 
                targets: answer_buttons[i], 
                background: '#FFFFFF', 
                duration: 500, 
                delay: 100, 
                easing: 'linear' 
            }) 
        } else { 
            answer_buttons[i].style.background = '#FF0000' 
            anime({ 
                targets: answer_buttons[i], 
                background: '#FFFFFF', 
                duration: 500, 
                delay: 100, 
                easing: 'linear' 
            }) 
        } 
        total_answers_given += 1 
 
 
        current_question = new Question() 
        current_question.display() 
    }) 
}
