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
  deleteButton.addEventListener("click", (e) => deleteFact(e));
  factDiv.appendChild(fact);
  factDiv.appendChild(deleteButton);
  body.appendChild(factDiv);
}

function generateFact() {
  const randomNumber = Math.floor(Math.random() * factsList.length);
  const fact = factsList[randomNumber];
  return fact;
}

function deleteFact(e) {
  const allFacts = document.querySelectorAll(".fact");
  const selectedFact = e.target.parentNode.firstChild;
  for (let fact of allFacts) {
    if (selectedFact.isEqualNode(fact)) {
      console.log("this node is equal", fact);
      body.removeChild(fact.parentNode);
    }
  }
}

