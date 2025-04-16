let countSpan = document.querySelector('.count span');
let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');

let currentIndex = 0;

function getQuestion(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(this.responseText);
            let qCount = 10;
            questionNum(qCount);
            addQuestionData(questions[currentIndex],qCount);
        }
    }
    myRequest.open("GET", "js/liput.json", true);
    myRequest.send();
}

getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
    if(currentIndex < count) {
        flagImg.src=`img/${obj.img}`;
        //Vaihtoehdot
        flagLis.forEach((li, i) => {
            li.id =`answer_${i+1}`;
            li.dataset.asnwer=obj[`options`][i];
            li.innerHTML = obj[`options`][i];

        });
    }
}