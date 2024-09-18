let checkList = document.querySelectorAll('.chak-box')
let inpAll = document.querySelectorAll('.inp-value')
let progressBar = document.querySelector('.progress')
let progressValue = document.querySelector('.progress-value')
let allGoalsQuote = [
    'Raise the bar by completing your goals!',
    'well begun is half done!',
    'Just a step away, keep going!',
    'Whoal this just completed all the goal,time for chill.'
]

let allGoals = JSON.parse(localStorage.getItem('AllGoal')) || {
    first : {
        name:'',
        completed :false
    },
    second : {
        name:'',
        completed :false
    },
    third : {
        name:'',
        completed :false
    }
    
}
let countCheck = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${100 / inpAll.length * countCheck}%`
progressValue.firstElementChild.innerText = `${countCheck}/${inpAll.length} completed`
progressBar.firstElementChild.innerText = allGoalsQuote[countCheck]
// if (countCheck == 1) {
//     progressBar.firstElementChild.innerText = 'well begun is half done!'
// }
// else if (countCheck == 2) {
//     progressBar.firstElementChild.innerText = 'Just a step away, keep going!'
// }
// else {
//     progressBar.firstElementChild.innerText = 'Whoal this just completed all the goal,time for chill.'

// }

checkList.forEach((element) => {
    element.addEventListener('click', () => {
        let allInpField = [...inpAll].every((inp) => {
            return inp.value
        })
        if (allInpField) {
            element.parentElement.classList.toggle('complete')
            let inputId = element.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            countCheck = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${100 / inpAll.length * countCheck}%`
            console.log(countCheck)
            progressValue.firstElementChild.innerText = `${countCheck}/${inpAll.length} completed`
            progressBar.firstElementChild.innerText = allGoalsQuote[countCheck]

            localStorage.setItem('AllGoal', JSON.stringify(allGoals))
            // if (countCheck == 1) {
            //     progressBar.firstElementChild.innerText = 'well begun is half done!'
            // }
            // else if (countCheck == 2) {
            //     progressBar.firstElementChild.innerText = 'Just a step away, keep going!'
            // }
            // else {
            //     progressBar.firstElementChild.innerText = 'Whoal this just completed all the goal,time for chill.'

            // }
        }
        else {
            progressBar.classList.add('show-error')
        }
    })
});


inpAll.forEach((inp) => {
    inp.addEventListener('focus', (e) => {
        progressBar.classList.remove('show-error')

    })
    inp.addEventListener('input', e => {
        if (allGoals[inp.id].completed) {
            inp.value = allGoals[inp.id].name
            return
        }
        allGoals[inp.id] = {
            name: inp.value,
            completed: false
        }
        localStorage.setItem('AllGoal', JSON.stringify(allGoals))
    })
});

inpAll.forEach((inp) => {
    let inputId = inp.id
    inp.value = allGoals[inputId].name
    if (allGoals[inputId].completed) {
        inp.parentElement.classList.add('complete')
    }
});