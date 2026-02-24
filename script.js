let thrivingList = [];
let strugglingList = [];
let currentStatus = "all";

let total = document.getElementById("total");
let thrivingCount = document.getElementById("thrivingCount");
let strugglingCount = document.getElementById("struggling");

const allFilterBtn = document.getElementById("all-filter-btn");
const thrivingFilterBtn = document.getElementById("thriving-filter-btn");
const strugglingFilterBtn = document.getElementById("struggling-filter-btn");

const allCards = document.getElementById("all-cards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

function calculateCount() {
  total.innerText = allCards.children.length;
  thrivingCount.innerText = thrivingList.length;
  strugglingCount.innerText = strugglingList.length;
}

calculateCount();

function toggleStyle(id) {
  allFilterBtn.classList.remove("bg-black", "text-white");
  thrivingFilterBtn.classList.remove("bg-black", "text-white");
  strugglingFilterBtn.classList.remove("bg-black", "text-white");

  allFilterBtn.classList.add("bg-gray-300", "text-black");
  thrivingFilterBtn.classList.add("bg-gray-300", "text-black");
  strugglingFilterBtn.classList.add("bg-gray-300", "text-black");

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove("bg-gray-300", "text-black");
  selected.classList.add("bg-black", "text-white");
  // console.log(selected);

  if (id == "thriving-filter-btn") {
    allCards.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderThriving();
  } else if (id == "all-filter-btn") {
    allCards.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id == "struggling-filter-btn") {
    allCards.classList.add("hidden");
    filterSection.classList.remove("remove");
    renderStruggling();
  }
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("thriving-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const plantName = parentNode.querySelector(".plant-name").innerText;
    const light = parentNode.querySelector(".light").innerText;
    const water = parentNode.querySelector(".water").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    parentNode.querySelector(".status").innerText = "Thrive";

    const cardInfo = {
      plantName,
      light,
      water,
      status: "Thrive",
      notes,
    };

    const plantExist = thrivingList.find(
      (item) => item.plantName == cardInfo.plantName,
    );

    if (!plantExist) {
      thrivingList.push(cardInfo);
    }
    strugglingList = strugglingList.filter(
      (item) => item.plantName != cardInfo.plantName,
    );
    if (currentStatus == "struggling-filter-btn") {
      renderStruggling();
    }
    calculateCount();
  } else if (event.target.classList.contains("struggling-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const plantName = parentNode.querySelector(".plant-name").innerText;
    const light = parentNode.querySelector(".light").innerText;
    const water = parentNode.querySelector(".water").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    parentNode.querySelector(".status").innerText = "Struggle";

    const cardInfo = {
      plantName,
      light,
      water,
      status: "Struggle",
      notes,
    };

    const plantExist = strugglingList.find(
      (item) => item.plantName == cardInfo.plantName,
    );

    if (!plantExist) {
      strugglingList.push(cardInfo);
    }
    thrivingList = thrivingList.filter(
      (item) => item.plantName != cardInfo.plantName,
    );
    if (currentStatus == "thriving-filter-btn") {
      renderThriving();
    }
    calculateCount();
  }
});

function renderThriving() {
  filterSection.innerHTML = "";

  for (let thrive of thrivingList) {
    let div = document.createElement("div");
    div.classList =
      "card flex justify-between items-start border border-gray-200 p-6 rounded-2xl bg-white shadow-sm";
    div.innerHTML = `
    <div class="space-y-3">
            <div>
              <p class="plant-name text-3xl font-semibold text-gray-800">
                ${thrive.plantName}
              </p>
              <p class="latin-name text-gray-500 italic">Monstera deliciosa</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <p class="light bg-gray-100 px-4 py-1.5 rounded-full text-sm">
                Bright indirect
              </p>
              <p class="water bg-gray-100 px-4 py-1.5 rounded-full text-sm">
                Water weekly
              </p>
            </div>
            <p class="status text-sm text-gray-500" data-field="status">
              ${thrive.status}
            </p>
            <p class="notes text-gray-700 max-w-md">
              New leaf unfurling by the east window ✨
            </p>
            <div class="flex gap-3 pt-1">
              <button
                class="thriving-btn bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Thrive
              </button>
              <button
                class="struggling-btn bg-red-100 hover:bg-red-200 text-red-800 px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Struggle
              </button>
            </div>
          </div>
          
          <div>
            <button
              class="delete-btn bg-red-100 text-red-700 hover:bg-red-200 px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
    `;
    filterSection.appendChild(div);
  }
}

function renderStruggling() {
  filterSection.innerHTML = "";

  for (let struggle of strugglingList) {
    let div = document.createElement("div");
    div.classList =
      "card flex justify-between items-start border border-gray-200 p-6 rounded-2xl bg-white shadow-sm";
    div.innerHTML = `
    <div class="space-y-3">
            <div>
              <p class="plant-name text-3xl font-semibold text-gray-800">
                ${struggle.plantName}
              </p>
              <p class="latin-name text-gray-500 italic">Monstera deliciosa</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <p class="light bg-gray-100 px-4 py-1.5 rounded-full text-sm">
                Bright indirect
              </p>
              <p class="water bg-gray-100 px-4 py-1.5 rounded-full text-sm">
                Water weekly
              </p>
            </div>
            <p class="status text-sm text-gray-500" data-field="status">
              ${struggle.status}
            </p>
            <p class="notes text-gray-700 max-w-md">
              New leaf unfurling by the east window ✨
            </p>
            <div class="flex gap-3 pt-1">
              <button
                class="thriving-btn bg-green-100 hover:bg-green-200 text-green-800 px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Thrive
              </button>
              <button
                class="struggling-btn bg-red-100 hover:bg-red-200 text-red-800 px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Struggle
              </button>
            </div>
          </div>
          
          <div>
            <button
              class="delete-btn bg-red-100 text-red-700 hover:bg-red-200 px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
    `;
    filterSection.appendChild(div);
  }
}
