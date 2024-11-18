document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.keyCode === 13) {
          let input = inputField.value;
          inputField.value = "";
          output(input);
      }
  });
});

function output(input) {
  let product;

  // Normalize input
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you")
      .replace(/tell about /g, "");

  if (compare(prompts, replies, text)) {
      // Search for exact match in `prompts`
      product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
      product = "You're welcome! If you'd like to know more about food donations, just ask.";
  } else {
      // If all else fails: random alternative
      product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
          if (promptsArray[x][y] === string) {
              let replies = repliesArray[x];
              reply = replies[Math.floor(Math.random() * replies.length)];
              replyFound = true;
              break;
          }
      }
      if (replyFound) {
          break;
      }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="img/user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
      botText.innerText = `${product}`;
      textToSpeech(product);
  }, 2000);
}

// Prompts and replies for food donation and management
const prompts = [
  ["how can i donate food", "where can i donate food"],
  ["how to manage food donations", "tips for managing food donations"],
  ["what is food waste", "how to reduce food waste"],
  ["how to store food", "best practices for food storage"],
  ["can you help with food distribution", "how to organize food distribution"]
];

const replies = [
  [
      "You can donate food by contacting local food banks, shelters, or community centers. Many organizations also accept online pledges for donations.",
      "Consider reaching out to charities or food rescue programs near you. They often have systems in place for food donation."
  ],
  [
      "To manage food donations effectively, ensure proper inventory tracking, maintain hygiene, and coordinate with local organizations.",
      "Use technology to track donations and work with volunteers to streamline the collection and distribution process."
  ],
  [
      "Food waste refers to food that is discarded or not used. To reduce waste, plan meals carefully, store food properly, and donate excess food.",
      "Avoid food waste by composting scraps, using leftovers creatively, and donating surplus food to those in need."
  ],
  [
      "Store food in a cool, dry place to prevent spoilage. For perishable items, use refrigeration or freezing.",
      "Use airtight containers and label items with expiration dates to ensure food safety."
  ],
  [
      "Yes, organizing food distribution involves setting up collection points, coordinating volunteers, and reaching out to communities in need.",
      "Work with local NGOs or community groups to ensure efficient food distribution to those who need it most."
  ]
];

const alternative = [
  "I'm here to assist with questions about food donation and management. How can I help?",
  "Could you rephrase your question? I specialize in food donation and management."
];

function textToSpeech(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}
