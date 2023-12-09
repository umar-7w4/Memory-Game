let cards = [];
let flippedCards = [];
let locked = false;
let timer;
let secondsRemaining;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateImagePairs8() {
    const images = ["image001.gif", "image002.gif", "image003.gif", "image004.gif", "image005.gif", 
    "image006.gif", "image007.gif", "image008.gif"];
    const pairs = [];

    for (let i = 0; i < 8; i++) {
        pairs.push(i);
    }

    const shuffledPairs = shuffleArray([...pairs, ...pairs]);

    return shuffledPairs.map(index => {
        return {
            imageUrl: images[index],
            isFlipped: false,
            isMatched: false
        };
    });
}

function generateImagePairs10() {
    const images = [
        "Flower1.png", "Flower2.png", "Flower3.png", "Flower4.png", "Flower5.png",
        "Flower6.png", "Flower7.png", "Flower8.png", "Flower9.png", "Flower10.png"
    ];
    const pairs = [];

    for (let i = 0; i < 10; i++) {
        pairs.push(i);
    }

    const shuffledPairs = shuffleArray([...pairs, ...pairs]);

    return shuffledPairs.map(index => {
        return {
            imageUrl: images[index],
            isFlipped: false,
            isMatched: false
        };
    });
}

function generateImagePairs12() {
    const images = [
        "Fruit1.png", "Fruit2.png", "Fruit3.png", "Fruit4.png", "Fruit5.png",
        "Fruit6.png", "Fruit7.png", "Fruit8.png", "Fruit9.png", "Fruit10.png",
        "Fruit11.png", "Fruit12.png"
    ];
    const pairs = [];

    for (let i = 0; i < 12; i++) {
        pairs.push(i);
    }

    const shuffledPairs = shuffleArray([...pairs, ...pairs]);

    return shuffledPairs.map(index => {
        return {
            imageUrl: images[index],
            isFlipped: false,
            isMatched: false
        };
    });
}

function startGame8(difficulty) {
    const gameContainer = document.getElementById('game-container');
    const startButtons = document.querySelectorAll('.start-buttons button');
    startButtons.forEach(button => button.style.display = 'none');

    // Clear previous game state
    gameContainer.innerHTML = '';
    flippedCards = [];
    locked = false;

    let timeout;
    switch (difficulty) {
        case 'easy':
            timeout = 8000;
            break;
        case 'medium':
            timeout = 5000;
            break;
        case 'hard':
            timeout = 3000;
            break;
        default:
            timeout = 5000; // Default to medium if difficulty is not recognized
            break;
    }

    cards = generateImagePairs8();

    // Shuffle the cards for random placement
    cards = shuffleArray(cards);

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);
        cardElement.style.backgroundImage = `url(${card.imageUrl})`;
        cardElement.addEventListener('click', () => flipCard(index));
        gameContainer.appendChild(cardElement);
    });

    setTimeout(() => {
        hideCards();
        startTimer(120);
    }, timeout); // Use the timeout directly here
}

function startGame10(difficulty) {
    const gameContainer = document.getElementById('game-container');
    const startButtons = document.querySelectorAll('.start-buttons button');
    startButtons.forEach(button => button.style.display = 'none');

    // Clear previous game state
    gameContainer.innerHTML = '';
    flippedCards = [];
    locked = false;

    let timeout;
    switch (difficulty) {
        case 'easy':
            timeout = 8000;
            break;
        case 'medium':
            timeout = 5000;
            break;
        case 'hard':
            timeout = 3000;
            break;
        default:
            timeout = 5000; // Default to medium if difficulty is not recognized
            break;
    }

    cards = generateImagePairs10();

    // Shuffle the cards for random placement
    cards = shuffleArray(cards);

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);
        cardElement.style.backgroundImage = `url(${card.imageUrl})`;
        cardElement.addEventListener('click', () => flipCard(index));
        gameContainer.appendChild(cardElement);
    });

    setTimeout(() => {
        hideCards();
        startTimer(150);
    }, timeout); // Use the timeout directly here
}

function startGame12(difficulty) {
    const gameContainer = document.getElementById('game-container');
    const startButtons = document.querySelectorAll('.start-buttons button');
    startButtons.forEach(button => button.style.display = 'none');

    // Clear previous game state
    gameContainer.innerHTML = '';
    flippedCards = [];
    locked = false;

    let timeout;
    switch (difficulty) {
        case 'easy':
            timeout = 8000;
            break;
        case 'medium':
            timeout = 5000;
            break;
        case 'hard':
            timeout = 3000;
            break;
        default:
            timeout = 5000; // Default to medium if difficulty is not recognized
            break;
    }

    cards = generateImagePairs12();

    // Shuffle the cards for random placement
    cards = shuffleArray(cards);

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);
        cardElement.style.backgroundImage = `url(${card.imageUrl})`;
        cardElement.addEventListener('click', () => flipCard(index));
        gameContainer.appendChild(cardElement);
    });

    setTimeout(() => {
        hideCards();
        startTimer(180);
    }, timeout); // Use the timeout directly here
}


function startTimer(duration) {
    secondsRemaining = duration;
    timer = setInterval(updateTimer, 1000);
    updateTimer();
}

// ... (existing code)




function displayImages() {
    cards.forEach((card, index) => {
        const cardElement = document.querySelector(`[data-index="${index}"]`);
        cardElement.style.backgroundImage = `url(${card.imageUrl})`;
    });
}

function flipCard(index) {
    const cardElement = document.querySelector(`[data-index="${index}"]`);

    if (!locked && !cards[index].isMatched) {
        if (!cards[index].isFlipped) {
            cardElement.style.backgroundImage = `url(${cards[index].imageUrl})`;
            cardElement.textContent = ''; 
            cards[index].isFlipped = true;
            flippedCards.push(index);

            if (flippedCards.length === 2) {
                locked = true;
                setTimeout(checkMatch, 1000);
            }
        } else {
            return;
        }
    }
}




function checkMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.imageUrl === secondCard.imageUrl) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        
        locked = false;  
    } else {
       
        flipBack(firstIndex, secondIndex);
    }


    flippedCards = [];

    if (cards.every(card => card.isMatched)) {
        endGame();
    }
}


function hideCards() {
    cards.forEach((card, index) => {
        const cardElement = document.querySelector(`[data-index="${index}"]`);
        cardElement.style.backgroundImage = 'none';
        cardElement.classList.remove('matched');

        
        const existingNumberElement = cardElement.querySelector('.card-number');
        if (existingNumberElement) {
            cardElement.removeChild(existingNumberElement);
        }

        
        const numberElement = document.createElement('span');
        numberElement.classList.add('card-number'); 
        numberElement.textContent = index + 1; 

  
        cardElement.appendChild(numberElement);

      
        numberElement.style.position = 'absolute';
        numberElement.style.top = '50%';
        numberElement.style.left = '50%';
        numberElement.style.transform = 'translate(-50%, -50%)';
        numberElement.style.fontSize = '3rem'; 
        numberElement.style.fontWeight = 'bold'; 
        numberElement.style.color = 'black'; 
    });
}

function flipBack(firstIndex, secondIndex) {
    setTimeout(() => {
        const firstCardElement = document.querySelector(`[data-index="${firstIndex}"]`);
        const secondCardElement = document.querySelector(`[data-index="${secondIndex}"]`);

        firstCardElement.style.backgroundImage = 'none';
        secondCardElement.style.backgroundImage = 'none';

        let firstNumberElement = firstCardElement.querySelector('.card-number');
        if (!firstNumberElement) {
            firstNumberElement = document.createElement('span');
            firstNumberElement.classList.add('card-number');
            firstCardElement.appendChild(firstNumberElement);
        }

        let secondNumberElement = secondCardElement.querySelector('.card-number');
        if (!secondNumberElement) {
            secondNumberElement = document.createElement('span');
            secondNumberElement.classList.add('card-number');
            secondCardElement.appendChild(secondNumberElement);
        }

        firstNumberElement.textContent = firstIndex + 1;
        secondNumberElement.textContent = secondIndex + 1;

        [firstNumberElement, secondNumberElement].forEach(numberElement => {
            numberElement.style.position = 'absolute';
            numberElement.style.top = '50%';
            numberElement.style.left = '50%';
            numberElement.style.transform = 'translate(-50%, -50%)';
            numberElement.style.fontSize = '3rem'; 
            numberElement.style.fontWeight = 'bold';
            numberElement.style.color = 'black';
        });

      
        cards[firstIndex].isFlipped = false;
        cards[secondIndex].isFlipped = false;

    
        locked = false;
    }, 1000);
}



function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time Remaining: ${secondsRemaining} seconds`;

    if (secondsRemaining === 0) {
        clearInterval(timer);
        endGame();
    }

    secondsRemaining--;
}

function endGame() {
    clearInterval(timer);

    // Check if all cards are matched
    if (cards.every(card => card.isMatched)) {
        // Congratulations animation
        window.location.href = 'congratulations.html'; // Navigate to the congratulations page
    } else {
        alert('Time is up! Try again.'); // You can modify this message as needed
        resetGame();
    }
}


function resetGame() {
    const gameContainer = document.getElementById('game-container');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');

    gameContainer.innerHTML = '';
    timerElement.textContent = '';
    startButton.style.display = 'block';
}

function startGameRedirect() {
    window.location.href = 'puzzle.html';
}

function startSalaryRedirect() {
    window.location.href = 'salary.html';
}


