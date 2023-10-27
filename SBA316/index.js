const factsList = data.facts;
const textBox = document.createElement("div");

const body = document.querySelector("body");
body.append(textBox);

const generateButton = document.getElementById("fact-button");
generateButton.addEventListener("click", createFactDiv);

function createFactDiv() {
  const factDiv = document.createElement("div");

  const fact = document.createElement("p");
  fact.classList.add("fact");
  fact.textContent = generateFact();

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => deleteFact(e));
  const highlightButton = document.createElement("button");
  highlightButton.textContent = "Highlight";
  highlightButton.addEventListener("click", (e) => highlight(e));
  factDiv.appendChild(fact);
  factDiv.appendChild(deleteButton);
  factDiv.appendChild(highlightButton);
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
      console.log("deleted");
      body.removeChild(fact.parentNode);
    }
  }
}

function highlight(e) {
  const allFacts = document.querySelectorAll(".fact");
  const selectedFact = e.target.parentNode.firstChild;
  console.log(e.target);
  for (let fact of allFacts) {
    if (selectedFact.isEqualNode(fact)) {
      if (fact.style.backgroundColor === "yellow") {
        fact.style.backgroundColor = "transparent";
        e.target.textContent = "Highlight";
      } else {
        console.log("highlighted");
        fact.style.backgroundColor = "yellow";
        e.target.textContent = "Unhighlight";
      }
    }
  }
}
