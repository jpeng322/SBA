const factsList = data.facts;
const textBox = document.createElement("div");

const body = document.querySelector("body");
body.append(textBox);

textBox.textContent = "sadasd";

const button = document.getElementById("fact-button");
button.addEventListener("click", generateFact);

function generateFact() {
  console.log("clicked");
  const randomNumber = Math.floor(Math.random() * factsList.length);
  const fact = document.createElement("p");
  fact.classList.add("fact");
  console.log(factsList[randomNumber]);
  fact.textContent = factsList[randomNumber];
  body.append(fact);
}
