const emojiDetails = [
    { description: "Smiling face with sunglasses", emoji: "😎" },
    { description: "Thumbs up", emoji: "👍" },
    { description: "Heart eyes", emoji: "😍" },
    { description: "Crying face", emoji: "😢" },
    { description: "Party popper", emoji: "🎉" },
  ];
 
  let currentEmojiIndex = 0;
  let score = 0;
  let timer;
  let timeRemaining = 30; 
  
  const guessInputElement = document.getElementById("guess-input");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const descriptionElement = document.getElementById("description");
  const timerElement = document.getElementById("timer");
  const restartButton = document.getElementById("restart-button");
  
  function startGame() {
    showNextEmoji();
    timer = setInterval(updateTimer, 1000);
  }
  
  function showNextEmoji() {
    if (currentEmojiIndex < emojiDetails.length) {
      const emoji = emojiDetails[currentEmojiIndex].emoji;
      descriptionElement.textContent = emoji;
      guessInputElement.value = ""; 
    } else {
      endGame();
    }
  }
  
  function updateTimer() {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerElement.textContent = `Time: ${timeRemaining}s`;
    } else {
      endGame();
    }
  }
  
  function checkGuess() {
    const userGuess = guessInputElement.value.toLowerCase();
    const correctGuess = emojiDetails[currentEmojiIndex].description.toLowerCase();
  
    if (userGuess === correctGuess) {
      score++;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Incorrect!";
      
      setTimeout(() => {
        resultElement.textContent = "";
      }, 3000);
    }
  
    scoreElement.textContent = `Score: ${score}`;
    currentEmojiIndex++;
  
    
    if (currentEmojiIndex < emojiDetails.length) {
      showNextEmoji();
    } else {
      endGame();
      restartGame();
    }
  }
  
  
  
  function endGame() {
    clearInterval(timer);
    resultElement.textContent = "Game Over!";
    restartButton.style.display = "block";
  }
  
  function restartGame() {
    currentEmojiIndex = 0;
    score = 0;
    timeRemaining = 30;
    startGame();
    restartButton.style.display = "none";
  }
  
  // Event listeners
  document.getElementById("guess-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });
  
  document.getElementById("restart-button").addEventListener("click", restartGame);
  startGame();
