const dinoObjData = {
  Dinos: [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "First discovered in 1889 by Othniel Charles Marsh",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "The largest known skull measures in at 5 feet long.",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Anklyosaurus survived for approximately 135 million years.",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: "372",
      diet: "herbavor",
      where: "North America",
      when: "Late Jurasic",
      fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbavor",
      where: "North America, Europe, Asia",
      when: "Late Jurasic to Early Cretaceous",
      fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbavor",
      where: "World Wide",
      when: "Holocene",
      fact: "All birds are living dinosaurs.",
    },
  ],
};

// Dino Functional Constructor
function Dinosaur(dinoData) {
  this.species = dinoData.species;
  this.weight = dinoData.weight;
  this.height = dinoData.height;
  this.diet = dinoData.diet;
  this.where = dinoData.where;
  this.when = dinoData.when;
  this.fact = dinoData.fact;
}

// Human Functional Constructor
function Human(name, feet, inches, weight, diet) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;
}

const submitButton = document.getElementById("btn");

//Fetch form data called when submit button is clicked
const fetchFormData = () =>
  new Human(
    document.getElementById("name").value,
    document.getElementById("feet").value,
    document.getElementById("inches").value,
    document.getElementById("weight").value,
    document.getElementById("diet").value
  );

// GenerateTile function creates HTML elements
function generateTile(name, imageUrl, fact, fact2, fact3) {
  let gridOuterDiv = document.createElement("div");
  gridOuterDiv.className = "grid-item";
  let speciesNameLabel = document.createElement("h3");
  speciesNameLabel.innerText = name;
  gridOuterDiv.appendChild(speciesNameLabel);
  let speciesImage = document.createElement("img");
  speciesImage.src = imageUrl;
  gridOuterDiv.appendChild(speciesImage);
  if (fact) {
    let otherInfoDiv = document.createElement("h4");
    otherInfoDiv.innerText = fact;
    gridOuterDiv.appendChild(otherInfoDiv);
  }
  if (fact2) {
    let factElement2 = document.createElement("h4");
    factElement2.innerText = fact2;
    gridOuterDiv.appendChild(factElement2);
  }
  if (fact3) {
    let factElement3 = document.createElement("h4");
    factElement3.innerText = fact3;
    gridOuterDiv.appendChild(factElement3);
  }
  return gridOuterDiv;
}

// CreateTilesGrid aggregates dinosaurs, and human info and displays it in an order
function createTilesGrid(humanInfoTile) {
  const resultGridView = document.getElementById("grid");
  dinoObjData["Dinos"]
    .map((val) => new Dinosaur(val))
    .forEach((dinoObj, index) => {
      if (index === 4) {
        resultGridView.appendChild(humanInfoTile);
      }
      resultGridView.appendChild(
        generateTile(
          dinoObj.species,
          "images/" + dinoObj.species + ".png",
          dinoObj.fact
        )
      );
    });
  return resultGridView;
}

// Dino Compare Method 1
function compareHumanDinoWeight(humanFormData, dinoDataArray) {
  let humanWeightGreaterThanDino = 0;
  dinoDataArray.forEach((dinoVal) => {
    if (humanFormData.weight > dinoVal.weight) {
      humanWeightGreaterThanDino = humanWeightGreaterThanDino + 1;
    }
  });
  return `You are heavier than ${humanWeightGreaterThanDino} Dinosaur species`;
}

// Dino Compare Method 2
function compareHumanDinoHeight(humanFormData, dinoDataArray) {
  let humanHeightGreaterThanDino = 0;
  const humanHeightInInches = humanFormData.feet * 12 + humanFormData.inches;
  dinoDataArray.forEach((dinoVal) => {
    if (humanHeightInInches > dinoVal.height) {
      humanHeightGreaterThanDino = humanHeightGreaterThanDino + 1;
    }
  });
  return `You are taller than ${humanHeightGreaterThanDino} Dinosaur species`;
}

// Dino Compare Method 3
function compareHumanDinoDiet(humanFormData, dinoDataArray) {
  let humanDinoDietSimilarity = 0;
  dinoDataArray.forEach((dinoVal) => {
    if (humanFormData.diet.value.toLowerCase() === dinoVal.diet) {
      humanDinoDietSimilarity = humanDinoDietSimilarity + 1;
    }
  });
  return `Your dietary preference matches ${humanDinoDietSimilarity} Dinosaur species`;
}

//DisplayGrid  hides form and displays data grid
function displayGrid(resultGridView) {
  document.getElementById("dino-compare").hidden = true;
  document.getElementById("grid").appendChild(resultGridView);
}

//on submit, human form data is fetched, comparison functions are called, and the result grid is displayed.
submitButton.addEventListener("click", function () {
  const humanFormData = fetchFormData();

  const humanWeightGreaterThanDino = compareHumanDinoWeight(
    humanFormData,
    dinoObjData["Dinos"]
  );

  const humanHeightGreaterThanDino = compareHumanDinoHeight(
    humanFormData,
    dinoObjData["Dinos"]
  );

  const humanDinoDietSimilarity = compareHumanDinoDiet(
    humanFormData,
    dinoObjData["Dinos"]
  );

  const humanInfoTile = generateTile(
    humanFormData.name,
    "images/human.png",
    humanWeightGreaterThanDino,
    humanHeightGreaterThanDino,
    humanDinoDietSimilarity
  );

  const resultGridView = createTilesGrid(humanInfoTile);
  displayGrid(resultGridView);
});
