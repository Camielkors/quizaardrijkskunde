console.log("helloooo")

const startBtn = document.querySelector('.speel');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-button')
const main = document.querySelector('.main')
const speelQuizKnop = document.querySelector('.doorgaan-button')
const quizPopup = document.querySelector('.quiz-section')
const allesPlay = document.querySelector('.allesplay')
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const tryAgainBtn = document.querySelector('.tryAgain-btn')
const goHomeBtn = document.querySelector('.goHome-btn')


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

speelQuizKnop.onclick =  () => {
    quizPopup.classList.add('active')
    popupInfo.classList.remove('active')
    allesPlay.classList.add('hidden');
    quizBox.classList.add('active')

    showQuestions(0);
    questionCounter(1)
    headerScore()

}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active')
    nextBtn.classList.remove('active')
    resultBox.classList.remove('active')
    

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}



let vragen = [
    {
        numb: 1,
        question: "Welk land heeft meer meren dan de rest van de wereld gecombineerd?",
        answer: "D. Canada",
        options: [
            "A. Zweden",
            "B. Rusland",
            "C. Finland",
            "D. Canada"
        ]
    },
    {
        numb: 2,
        question: "In welk land vind je een stad die half in Europa en half in Azië ligt?",
        answer: "B. Turkije",
        options: [
            "A. Rusland",
            "B. Turkije",
            "C. Kazachstan",
            "D. Egypte"
        ]
    },
    {
        numb: 3,
        question: "Welke stad is de hoogst gelegen hoofdstad ter wereld?",
        answer: "C. La Paz, Boliva",
        options: [
            "A. Quito, Ecuador",
            "B. Kathmandu, Nepal",
            "C. La Paz, Boliva",
            "D. Thimphu, Bhutan"
        ]
    },
    {
        numb: 4,
        question: "Welk land wordt traditioneel 'Het Land van de Witte Olifant' genoemd?",
        answer: "A. Thailand",
        options: [
            "A. Thailand",
            "B. India",
            "C. Cambodja",
            "D. Sri Lanka"
        ]
    },
    {
        numb: 5,
        question: "Wat is de enige vlag ter wereld die niet vierhoekig is?",
        answer: "B. Nepal",
        options: [
            "A. Zwitserland",
            "B. Nepal",
            "C. Panama",
            "D. Japan"
        ]
    },
];

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn')

nextBtn.onclick = () => {
    if (questionCount < vragen.length - 1) {
       questionCount++;
       showQuestions(questionCount);

       questionNumb++;
       questionCounter(questionNumb);

       nextBtn.classList.remove('active')
    }
    else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list')

function showQuestions(index) {
    const questionText = document.querySelector('.question-text')
    questionText.textContent = `${vragen[index].numb}. ${vragen[index].question}`;

    let optionTag = `<div class="option"><span>${vragen[index].options[0]}</span></div>
    <div class="option"><span>${vragen[index].options[1]}</span></div>
    <div class="option"><span>${vragen[index].options[2]}</span></div>
    <div class="option"><span>${vragen[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = vragen[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct')
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('fout')

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active')
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total')
    questionTotal.textContent = `${index} of ${vragen.length} Questions`;
}

function headerScore () {
    const headerScoreText = document.querySelector('.header-score')
    headerScoreText.textContent = `Score; ${userScore} / ${vragen.length}`;
}

function showResultBox () {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Jouw Score ${userScore} van de ${vragen.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / vragen.length) * 100;
    let speed  = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        // console.log (progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}