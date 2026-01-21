/*-------------------------------- Constants --------------------------------*/
class Card {
    constructor(name, front) {
        this.name = name
        this.front = front
    }
    
}

const halfDeck = [
    new Card("1", "<img src='images/dino-images/T-Rex.jpeg' alt='T-Rex'>"), 
    new Card("2", "<img src='images/dino-images/Carcharodontosaurus.jpeg' alt='Carcharodontosaurus'>"), 
    new Card("3", "<img src='images/dino-images/Carnotaurus.jpeg' alt='Carnotaurus'>"), 
    new Card("4", "<img src='images/dino-images/Spinosaurus.jpeg' alt='Spinosaurus'>"), 
    new Card("5", "<img src='images/dino-images/Baryonynx.jpeg' alt='Baryonynx'>"), 
    new Card("6", "<img src='images/dino-images/Velociraptor.jpeg' alt='Velociraptor'>"), 
    new Card("7", "<img src='images/dino-images/Dimetrodon.jpeg' alt='Dimetrodon'>"), 
    new Card("8", "<img src='images/dino-images/Dilophosaurus.jpeg' alt='Dilophosaurus'>"), 
    new Card("9", "<img src='images/dino-images/Therizanosaurus.jpeg' alt='Therizanosaurus'>"), 
    new Card("10", "<img src='images/dino-images/Triceratops.jpeg' alt='Triceratops'>"), 
    new Card("11", "<img src='images/dino-images/Stegosaurus.jpeg' alt='Stegosaurus'>"), 
    new Card("12", "<img src='images/dino-images/Ankylosaurus.jpeg' alt='Ankylosaurus'>"), 
    new Card("13", "<img src='images/dino-images/Brontosaurus.jpeg' alt='Brontosaurus'>"), 
    new Card("14", "<img src='images/dino-images/Pterodactyl.jpeg' alt='Pterodactyl'>"), 
    new Card("15", "<img src='images/dino-images/Parasaurolophus.jpeg' alt='Parasaurolophus'>")
]



const winTally = {Losses: 0, Wins: 0}

const matchTally = {Unmatched: 30, Matched:0}

const cardBack = '<img src="./images/card-back.jpeg" alt="dinosaur card design">';


/*---------------------------- Variables (state) ----------------------------*/

let fullDeck = [];

let shuffleD = [];

let clickCount = 0;

let start;

let show;

let choice1;

let choice2;

let choiceCard1;

let choiceCard2;

let failCount = 0;

let win;

let lose;

let match;

let timer;

let iClickCnt = 0;
/*------------------------ Cached Element References ------------------------*/

const message = document.querySelector('#message');
const cards = document.querySelectorAll('.sqr');
const showBtn = document.querySelector('#show');
const startBtn = document.querySelector('#start');
const matchDisplay = document.querySelector('#matches-tally');
const winDisplay = document.querySelector('#win-tally');
const resetBtn = document.querySelector('#reset');
const body = document.querySelector('#background')
const iBtn = document.querySelector('#instructions')
const iImg = document.querySelector('#iImg')

/*-------------------------------- Functions --------------------------------*/

const init = function() {
    
    start = false;
    show = false;
    match = false;
    win = false;
    lose = false;
    iClickCnt = 0;
    updateMessage();
    render();

}

const updateMessage = function() {
    if (start === false && show === false) {
        message.textContent = "Welcome to RECALL. Ready to Play?"
    }
    else if (start === false && show === true) {
        message.textContent = "Board exposed, commit to memory. Press START to play!"
    }
    else if (lose === true) {
        message.textContent = "You've Lost! Please wait to Play Again!"
    }

    matchDisplay.textContent = `Unmatched: ${matchTally.Unmatched} / Matched: ${matchTally.Matched}`;

    winDisplay.textContent = `Losses: ${winTally.Losses} / Wins: ${winTally.Wins}`;

}

const render = function() {
    cards.forEach((card) => {
        card.innerHTML = cardBack;
    })
    
    halfDeck.forEach((one) => {
        fullDeck.push(one, one);
    })
    
    while (fullDeck.length > 0) {
        let rIdx = Math.floor(Math.random() * fullDeck.length);
        const randomCard = fullDeck.splice(rIdx, 1) [0];

        shuffleD.push(randomCard);
    }
}

const handleClick = function(event) {
    const cardId = event.target.id;


    if (clickCount < 2) {
        clickCount++
    }
    if (start === true) {
    cards[cardId].innerHTML = shuffleD[cardId].front
    }

    if (clickCount === 1) {
        choice1 = shuffleD[cardId].name;
        choiceCard1 = cards[cardId];
    } 
    if (clickCount === 2) {
        choice2 = shuffleD[cardId].name;
        choiceCard2 = cards[cardId];
    
    }else {
        return
    }

    matchCheck();
    failedTurn();
    winCheck();
    updateMessage();
}

const matchCheck = function() {
        
    if (choice1 === choice2 ) { 
        matchTally.Matched++;
        matchTally.Unmatched--;
        setTimeout(function() {
            clickCount = 0
        },1000 )
    }
    else if (clickCount >= 2 && choice1 !== choice2) {
        setTimeout(function() {
            clickCount = 0
        }, 1000);
    }

}

const failedTurn = function() {
    if (clickCount === 1) {
    timer = setTimeout(function() {
    if (clickCount < 2) {
        failCount++;
        choiceCard1.innerHTML = cardBack;
        choice1 = null;
        clickCount = 0
    }
    }, 10000)
    }
    
    if (clickCount >= 2 && choice1 !== choice2) {
            setTimeout(function() {
            failCount++;
            clickCount = 0;
            choiceCard1.innerHTML = cardBack;
            choice1 = null;
            choiceCard2.innerHTML = cardBack;
            choice2 = null;
            }, 1000)
            clearTimeout(timer)
        }

    if (clickCount >= 2 && choice1 === choice2) {
        clearTimeout(timer)
    }
    
}

const winCheck = function() {

    if (matchTally === 30) {
        win = true;
        winTally.Wins++;
    }
    if (failCount >= 8) {
        winTally.Losses++;
        lose = true;
    }
    lost()
}

const showBoard = function() {
shuffleD.forEach((card, index) => {
        cards[index].innerHTML = card.front
    })
    show = true;
    updateMessage();
}

const play = function() {
    
for (let card of cards) {
    card.innerHTML = cardBack;
    }
    start = true;
    if (start === true) {
        showBtn.disabled = true;
    }
    
}

const lost = function() {
    if (lose === true) {
        cards.forEach((card) => {
        card.style.visibility = 'hidden';
    })
        setTimeout(function() {
            reset();
        }, 4000)
    }
}

const reset = function() {
    cards.forEach((card) => {
        card.style.visibility = 'visible';
    })
    lose = false;
    matchTally.Matched = 0;
    matchTally.Unmatched = 30;
    failCount = 0;
    choice1 = null;
    choice2 = null;
    clickCount = 0;
    start = false;
    showBtn.disabled = false;
    show = false;
    fullDeck = [];
    shuffleD = [];
    render();
    updateMessage();
    init()
}

const instructions = function() {
    iClickCnt++
    if(iClickCnt === 1) {
        iImg.style.display = 'block';
    }
    if(iClickCnt === 2) {
        iImg.style.display = 'none';
        iClickCnt = 0
    }

}

init();
/*----------------------------- Event Listeners -----------------------------*/

// show button reveals cards
showBtn.addEventListener('click', showBoard)

// start button hides cards
startBtn.addEventListener('click', play)

// reveals card with click
cards.forEach(function(cardBtn) {
cardBtn.addEventListener('click', handleClick)
})

resetBtn.addEventListener('click', reset)

iBtn.addEventListener('click', instructions)


//------------------------------------------------------------------------------------------------------------
