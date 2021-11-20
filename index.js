const x = 3;
const y = 4;
//카드 뒤 색깔 7개 2개씩 미리 설정
const backColor = [
    '#FFC312', '#FFC312',
    '#C4E538', '#C4E538',
    '#12CBC4', '#12CBC4',
    '#ED4C67', '#ED4C67',
    '#FDA7DF', '#FDA7DF',
    '#833471', '#833471',
    '#FFFFFF', '#FFFFFF',
    '#999999', '#999999'
]

//위의 색깔 랜덤 섞기 - 피셔 예이츠 방식
let chosenColor = [];

while (backColor.length > 0) {
    let color = Math.floor(Math.random() * backColor.length); //0-13까지 정수
    let mixedColor = backColor.splice(color, 1)[0];
    chosenColor.push(mixedColor);
}
console.log(chosenColor);

var aa;

function cardSetting(x, y) {
    //카드 세팅
    for (let i = 0; i < x * y; i++) {
        const card = document.createElement('div');
        card.className = 'card wait';
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.dataset.color = chosenColor[i];
        cardBack.style.backgroundColor = chosenColor[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        document.querySelector(".center-space").appendChild(card);

        //클릭하여 카드 뒤집기

        let prevColor, currentColor;

        card.addEventListener('click', function () {

            if (!card.classList.contains("wait")) return;
            if (card.classList.contains("flipped")) return;

            card.classList.add('flipped');
            currentColor = card.querySelector(".card-back").dataset.color;

            if(prevColor === currentColor){
                document.querySelectorAll('flipped').forEach(el => el.classList.remove('wait'));
            }




            const onEl = document.querySelectorAll(".on");

            if (onEl.length === 2) {
                return;
            }


            if (card.classList.contains("flipped")) {
                card.classList.add('on');
            } else {
                card.classList.remove('on');
            }

            firstColor = onEl[0].querySelector(".card-back").dataset.color;

            const oneColor = onEl[0].querySelector(".card-back").dataset.color
            const twoColor = card.querySelector(".card-back").dataset.color

            if (oneColor === twoColor) {
                onEl[0].classList.remove('wait');
                card.classList.remove('wait');
                return;
            }

            setTimeout(() => {
                if (oneColor !== twoColor) {
                    onEl[0].classList.toggle('flipped');
                    card.classList.toggle('flipped');
                }
                onEl[0].classList.remove('on');
                card.classList.remove('on');
            }, 1000)
        });
    }
}

cardSetting(x, y);
