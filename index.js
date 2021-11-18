const x = 4;
const y = 3;
//카드 뒤 색깔 7개 2개씩 미리 설정
const backColor = ['#FFC312', '#FFC312', '#C4E538', '#C4E538', '#12CBC4', '#12CBC4', '#ED4C67', '#ED4C67', '#FDA7DF', '#FDA7DF', '#833471', '#833471']

//위의 색깔 랜덤 섞기 - 피셔 예이츠 방식
let chosenColor = [];

while (backColor.length > 0) {
    let color = Math.floor(Math.random() * backColor.length); //0-13까지 정수
    let mixedColor = backColor.splice(color, 1)[0];
    chosenColor.push(mixedColor);
}
console.log(chosenColor);

function cardSetting(x, y) {
    //카드 세팅
    for (let i = 0; i < x * y; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = chosenColor[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        document.body.appendChild(card);

        //클릭하여 카드 뒤집기
        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });
    }
}

cardSetting(x, y);
