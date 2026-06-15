const countryInput = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");
const errorText = document.getElementById("error-text");
const resultCard = document.getElementById("result-card");

const countryFlag = document.getElementById("country-flag");
const countryName = document.getElementById("country-name");
const countryCapital = document.getElementById("country-capital");
const countryRegion = document.getElementById("country-region");
const countryPopulation = document.getElementById("country-population");

const API_KEY = "rc_live_ac2f575d6e2e4016b0e378a0790bad5d";
const BASE_URL = "https://api.restcountries.com/countries/v5";

async function getCountryData(countryNameInput) {
  errorText.textContent = "";

  try {
    if (countryInput.value === "") {
      throw new Error("Empty Country Input");
    }

    const request = new Request(
      `${BASE_URL}/names.common/${encodeURIComponent(countryNameInput)}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Country Data Not Found");
    }

    const data = await response.json();

    displayCountry(data);
  } catch (error) {
    errorText.innerHTML = `<span>${error.message}</span>`;
    console.error(error);
  }
}

function displayCountry(data) {
  const country = data?.data?.objects?.[0];

  if (!country) {
    throw new Error("Country Data Not Found");
  }

  const nameCommon = country.names?.common || "Tidak diketahui";

  const capitalCity =
    country.capitals && country.capitals.length > 0
      ? country.capitals[0].name
      : "Tidak memiliki ibu kota";

  const regionName = country.region || "Tidak ada region";

  const populationFormatted = country.population
    ? country.population.toLocaleString("id-ID")
    : "0";

  const flagUrl = country.flag?.url_svg || country.flag?.url_png || "";

  countryName.textContent = nameCommon;
  countryCapital.textContent = capitalCity;
  countryRegion.textContent = regionName;
  countryPopulation.textContent = populationFormatted;

  if (flagUrl) {
    countryFlag.src = flagUrl;
    countryFlag.alt = `Bendera ${nameCommon}`;
    countryFlag.style.display = "block";
  } else {
    countryFlag.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const query = countryInput.value.trim();
  getCountryData(query);
});
