const inputText = document.getElementById("input-text");
const searchBtn = document.getElementById("search-btn");
const cardDiv = document.getElementById("card-div");
const section = document.getElementById("section");

function submitForm(event) {
  event.preventDefault();
}
searchBtn.addEventListener("click", function () {
  const inputValueText = inputText.value;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValueText}`
  )
    .then((response) => response.json())
    .then((data) => getFoodData(data.meals));
  section.classList.remove("mb-[115%]", "sm:mb-64");
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
      "mb-10"
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
          </div>
      </div>
    `;
    cardDiv.appendChild(div);
  });
}
