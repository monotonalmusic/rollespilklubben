let words = document.querySelectorAll('#text-rotator .word');
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let rotateText = function() {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  // Roter bogstaverne ud af det aktuelle ord
  Array.prototype.forEach.call(currentWord.children, function(letter, i) {
    setTimeout(function() {
      letter.className = "letter out";
    }, i * 80);
  });

  // Gør det næste ord synligt og roter bogstaverne ind
  nextWord.style.opacity = "1";
  Array.prototype.forEach.call(nextWord.children, function(letter, i) {
    letter.className = "letter behind";
    setTimeout(function() {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

// Start rotationen og gentag hvert 4. sekund
rotateText();
setInterval(rotateText, 4000);