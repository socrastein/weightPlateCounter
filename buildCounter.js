const plateSizesPounds = [
  { weight: 1.25, width: 1, height: 33, lbs: true },
  { weight: 2.5, width: 1, height: 50, lbs: true },
  { weight: 5, width: 1, height: 66, lbs: true },
  { weight: 10, width: 1, height: 100, lbs: true },
  { weight: 15, width: 1.375, height: 100, lbs: true },
  { weight: 25, width: 2, height: 100, lbs: true },
  { weight: 35, width: 2.75, height: 100, lbs: true },
  { weight: 45, width: 3.25, height: 100, lbs: true },
  { weight: 55, width: 3.75, height: 100, lbs: true },
  { weight: 100, width: 5, height: 100, lbs: true },
];

const plateSizesKilos = [
  { weight: 0.5, width: 1, height: 4.5, lbs: false },
  { weight: 1, width: 1, height: 6.75, lbs: false },
  { weight: 1.5, width: 1, height: 7, lbs: false },
  { weight: 2, width: 1, height: 9, lbs: false },
  { weight: 2.5, width: 1, height: 18, lbs: false },
  { weight: 5, width: 1.375, height: 18, lbs: false },
  { weight: 10, width: 2, height: 18, lbs: false },
  { weight: 15, width: 2.75, height: 18, lbs: false },
  { weight: 20, width: 3.25, height: 18, lbs: false },
  { weight: 25, width: 3.75, height: 18, lbs: false },
  { weight: 50, width: 5, height: 18, lbs: false },
];

const platesArray = [];
const counterState = {
  addingEnabled: true,
  unitsInPounds: true,
};

const buildEmptyPlateCounter = () => {
  let units;
  let totalValue;
  let plateArray;

  const mainContainer = document.getElementById("mainContainer");

  if (counterState.unitsInPounds) {
    totalValue = "45";
    units = "lbs";
    plateArray = plateSizesPounds;
  } else {
    totalValue = "20";
    units = "kg";
    plateArray = plateSizesKilos;
  }

  const container = document.createElement("div");
  container.id = "plateCounterContainer";
  const total = document.createElement("p");
  total.id = "plateCounterTotal";
  total.textContent = `${totalValue} ${units}`;
  const displayDiv = document.createElement("div");
  displayDiv.id = "plateCounterDisplay";
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "plateCounterButtonContainer";

  container.append(total);
  container.append(displayDiv);
  container.append(buttonContainer);

  const displayCollar = document.createElement("div");
  displayCollar.id = "plateCounterDisplayCollar";
  const displayPlates = document.createElement("div");
  displayPlates.id = "plateCounterDisplayPlates";
  const displayBar = document.createElement("div");
  displayBar.id = "plateCounterDisplayBar";
  displayDiv.append(displayCollar);
  displayDiv.append(displayPlates);
  displayDiv.append(displayBar);

  buttonContainer.append(makeAddButton());
  buttonContainer.append(makeDelButton());
  buttonContainer.append(makeClearButton());

  makeWeightButtons(plateArray, buttonContainer);

  mainContainer.append(container);
};

const updatePlateCounterTotal = () => {
  const displayTotal = document.getElementById("plateCounterTotal");
  const length = platesArray.length;
  let total;
  if (counterState.unitsInPounds) {
    total = 45;
    units = "lbs";
  } else {
    total = 20;
    units = "kg";
  }

  for (let i = 0; i < length; i++) {
    total += platesArray[i].weight * 2;
  }
  displayTotal.textContent = `${total} ${units}`;
};

const updatePlateCounterDisplay = () => {
  const displayPlates = document.getElementById("plateCounterDisplayPlates");
  displayPlates.textContent = "";
  const length = platesArray.length;
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      const plate = document.createElement("div");
      plate.classList.add("plateCounterPlate");
      plate.textContent = platesArray[i].weight;
      plate.style.width = `${platesArray[i].width}rem`;
      plate.style.height = `${platesArray[i].height}%`;
      displayPlates.append(plate);
    }
  }
};

const makeAddButton = () => {
  const button = document.createElement("button");
  button.id = "plateCounterAddButton";
  button.classList.add("plateCounterPlateButton", "buttonSelected");
  button.textContent = "ADD";
  button.onclick = () => {
    counterState.addingEnabled = true;
    document
      .getElementById("plateCounterDelButton")
      .classList.remove("buttonSelected");
    button.classList.add("buttonSelected");
  };
  return button;
};

const makeDelButton = () => {
  const button = document.createElement("button");
  button.id = "plateCounterDelButton";
  button.classList.add("plateCounterPlateButton");
  button.textContent = "DEL";
  button.onclick = () => {
    counterState.addingEnabled = false;
    document
      .getElementById("plateCounterAddButton")
      .classList.remove("buttonSelected");
    button.classList.add("buttonSelected");
  };
  return button;
};

const makeClearButton = () => {
  const button = document.createElement("button");
  button.id = "plateCounterClearButton";
  button.classList.add("plateCounterPlateButton");
  button.textContent = "CLEAR";
  button.onclick = () => {
    console.log("Clearing plate counter");
    platesArray.length = 0;
    counterState.addingEnabled = true;
    document
      .getElementById("plateCounterDelButton")
      .classList.remove("buttonSelected");
    document
      .getElementById("plateCounterAddButton")
      .classList.add("buttonSelected");
    updatePlateCounterDisplay();
    updatePlateCounterTotal();
  };
  return button;
};

let isClickEnabled = true;

const makeWeightButtons = (plateArray, buttonContainer) => {
  const length = plateArray.length;

  for (let i = 0; i < length; i++) {
    let weight = plateArray[i].weight;
    let button = document.createElement("button");
    button.classList.add("plateCounterPlateButton");
    button.setAttribute("weight", weight);

    button.textContent = `${weight}`;

    button.onclick = () => {
      if (isClickEnabled) {
        isClickEnabled = false;
        if (counterState.addingEnabled === true) {
          addWeightPlate(plateArray[i]);
        } else {
          delWeightPlate(plateArray[i]);
        }
        updatePlateCounterDisplay();
        updatePlateCounterTotal();
      }
      setTimeout(function () {
        isClickEnabled = true;
      }, 100);
    };

    buttonContainer.append(button);
  }
};

const addWeightPlate = (plateObject) => {
  platesArray.push(plateObject);
};

const delWeightPlate = (plateObject) => {
  const plateIndex = platesArray.findLastIndex((element) => {
    return (
      element.weight === plateObject.weight && element.lbs === plateObject.lbs
    );
  });
  if (plateIndex > -1) {
    platesArray.splice(plateIndex, 1);
  }
};

const createFooter = () => {
  const footer = document.createElement("footer");

  const attribution = document.createElement("p");
  attribution.textContent = "Built by Matt Talley";

  const gitLogo = document.createElement("img");
  gitLogo.classList.add("footerLogo");
  gitLogo.src = "./github.svg";
  gitLogo.onclick = () => {
    window.open('https://github.com/socrastein', '_blank')
  }

  footer.append(attribution);
  footer.append(gitLogo);

  document.body.append(footer);
};


buildEmptyPlateCounter();
createFooter();