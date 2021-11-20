const config = {
    x: 3,
    y: 4,
    data: [
        {color: '#FFC312', text: '채팅'},
        {color: '#C4E538', text: '올인원'},
        {color: '#12CBC4', text: '협업'},
        {color: '#ED4C67', text: '프로젝트'},
        {color: '#FDA7DF', text: '업무'},
        {color: '#833471', text: '워크'},
    ]
}

document.addEventListener("DOMContentLoaded", () => {
    cardSetting(config.x, config.y);
});

function getRandomColorArray() {
    //위의 색깔 랜덤 섞기 - 피셔 예이츠 방식
    let chosenColor = [];
    const colors = config.data.map(v => v.color);
    const backColor = [...colors, ...colors]
    while (backColor.length > 0) {
        let color = Math.floor(Math.random() * backColor.length); //0-13까지 정수
        let mixedColor = backColor.splice(color, 1)[0];
        chosenColor.push(mixedColor);
    }
    return chosenColor;
}

function cardSetting(x, y) {

    const randomColorArray = getRandomColorArray();

    let prevCard;
    let timer;

    //카드 세팅
    for (let i = 0; i < x * y; i++) {

        const card = document.createElement('div');
        card.className = 'card wait flipped';

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        const cardImage = document.createElement('div');
        cardImage.className = 'card-image';
        cardFront.appendChild(cardImage);

        cardInner.appendChild(cardFront);

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.dataset.color = randomColorArray[i];
        cardBack.style.backgroundColor = randomColorArray[i];

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = config.data.find(v => v.color === randomColorArray[i]).text;
        cardBack.appendChild(cardText);

        cardInner.appendChild(cardBack);

        card.appendChild(cardInner);
        document.querySelector(".center-space").appendChild(card);

        card.addEventListener('click', function () {

            if (timer) return;
            if (!card.classList.contains("wait")) return;
            if (card.classList.contains("flipped")) return;

            card.classList.add('flipped');

            if (!prevCard) return (prevCard = card);

            const currentColor = card.querySelector(".card-back").dataset.color;
            const prevColor = prevCard.querySelector(".card-back").dataset.color;

            if (prevColor === currentColor) {
                [prevCard, card].forEach(el => el.classList.remove('wait'));
                prevCard = null;
                if (isDone()) {
                    setTimeout(() => {
                        alert('Complete!');
                    }, 1000)
                }
                return;
            }

            timer = setTimeout(() => {
                [prevCard, card].forEach(el => el.classList.remove('flipped'));
                prevCard = null;
                timer = null;
            }, 1000)

            function isDone() {
                return document.querySelectorAll('.card.wait').length === 0
            }
        });
    }

    timer = setTimeout(() => {
        document.querySelectorAll('.card').forEach(el => el.classList.remove('flipped'))
        timer = null;
    }, 1000)
}

