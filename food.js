const inputText = document.getElementById("input-text");
const searchBtn = document.getElementById("search-btn");
const cardDiv = document.getElementById("card-div");
const section = document.getElementById("section");
const modalTitle = document.getElementById("modalId");
const modalImg = document.getElementById("modal-img");
const modalList = document.getElementById("modalList");
const youTubeLink = document.getElementById("link");

fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=salmon")
  .then((response) => response.json())
  .then((data) => getFoodData(data.meals));

function submitForm(event) {
  event.preventDefault();
}
searchBtn.addEventListener("click", function () {
  const inputValueText = inputText.value;

  const searchValue = inputValueText.trim();

  if (searchValue === "") {
    alert("Please enter a search term.");
    return;
  } else if (!isNaN(searchValue)) {
    alert("Please enter a text value.");
    return;
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then((response) => response.json())
      .then((data) => getFoodData(data.meals));
  }
});

function getFoodData(meals) {
  cardDiv.innerHTML = " ";
  meals.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add(
      "max-w-sm",
      "bg-red-200",
      "border",
      "border-gray-200",
      "rounded-lg",
      "shadow",
      "mb-10",
      "flex",
      "flex-col",
      "justify-between",
      "items-center",
      "shadow-lg"
    );
    div.innerHTML = `
          <a href="#">
            <img class="rounded-t-lg object-contain" src="${
              data.strMealThumb
            }" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">${
                data.strMeal
              }</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700">${data.strInstructions.slice(
              0,
              250
            )}</p>
            <label onclick="detailsID(${
              data.idMeal
            })" for="my-modal-6" class="btn mt-auto ml-auto mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Details</label>
          </div>
          


    `;
    cardDiv.appendChild(div);
  });
}

const detailsID = (detailsIDLink) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsIDLink}`)
    .then((response) => response.json())
    .then((data) => showDetails(data.meals[0]));
};

const showDetails = (ShowModal) => {
  modalTitle.innerText = ShowModal.strCategory;
  modalImg.innerHTML = `
  <img class="rounded w-full h-80" src="${ShowModal.strMealThumb}" alt="">
  `;
  modalList.innerHTML = `
  <li class="mr-2 font-bold">Ingredients:</li>
  <li>${ShowModal.strIngredient1}</li>,
  <li>${ShowModal.strIngredient2}</li>,
  <li>${ShowModal.strIngredient3}</li>,
  <li>${ShowModal.strIngredient4}</li>,
  <li>${ShowModal.strIngredient5}</li>,
  <li>${ShowModal.strIngredient6}</li>,
  <li>${ShowModal.strIngredient7}</li>
  `;
  youTubeLink.innerHTML = `
  <a href="${ShowModal.strYoutube}" target="_blank"> <span class="font-bold">YouTube:</span> <span class="text-red-800"> https://www.youtube.com/watch?v=V2PMvBv52IE</span> </a>
  `;
};
