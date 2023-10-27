const factsList = data.facts;
const textBox = document.createElement("div");

const body = document.querySelector("body");
body.append(textBox);

textBox.textContent = "sadasd";

const generateButton = document.getElementById("fact-button");
generateButton.addEventListener("click", createFactDiv);

function createFactDiv() {
  const factDiv = document.createElement("div");

  const fact = document.createElement("p");
  fact.classList.add("fact");
  fact.textContent = generateFact();

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";

  factDiv.append(fact);
  factDiv.append(deleteButton);
  body.append(factDiv);
}

function generateFact() {
  const randomNumber = Math.floor(Math.random() * factsList.length);
  const fact = factsList[randomNumber];
  return fact;
}
