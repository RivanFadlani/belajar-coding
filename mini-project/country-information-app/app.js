const countryInput = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");
const errorText = document.getElementById("error-text");
const resultCard = document.getElementById("result-card");
const countryFlag = document.getElementById("country-flag");
const countryName = document.getElementById("country-name");
const countryCapital = document.getElementById("country-capital");
const countryRegion = document.getElementById("country-region");
const countryPopulation = document.getElementById("country-population");

const API_KEY = "rc_live_182d0ee3e91d402b80c54b20e5f891c0";
const BASE_URL = "https://api.restcountries.com/countries/v5";

async function getCountryData(countryNameInput) {
  errorText.textContent = "";
  resultCard.style.display = "none";

  // Validasi input sebelum fetch
  if (!countryNameInput) {
    errorText.innerHTML = `<span>Masukkan nama negara terlebih dahulu</span>`;
    return; // kalau benar kosong, stop sampai di sini (fetch tidak dilanjutkan)
  }

  try {
    // Endpoint: Read by property — exact match (case-insensitive)
    // Format: GET /countries/v5/names.common/{value}
    const response = await fetch(
      `${BASE_URL}/names.common/${encodeURIComponent(countryNameInput)}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Negara tidak ditemukan");
    }

    const data = await response.json();
    displayCountry(data);
  } catch (error) {
    errorText.innerHTML = `<span>${error.message}</span>`;
    console.error(error);
  }
}

function displayCountry(response) {
  // Akses property 'data' dari parameter 'response',
  // jika 'data' ada maka lanjut akses property 'objects',
  // jika 'objects' ada maka ambil elemen pertama (index 0) dari array 'objects',
  // jika 'objects[0]' ada maka simpan ke variable 'country'
  const country = response?.data?.objects?.[0];

  if (!country) {
    throw new Error("Data negara tidak ditemukan");
  }

  // kalau hasil kiri (country.names?.common) adalah falsy (null, undefined, "", 0), gunakan nilai kanan ("Tidak diketahui") sebagai gantinya.
  const nameCommon = country.names?.common || "Tidak diketahui";

  const capitalCity =
    // ternary operator
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

  resultCard.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  const query = countryInput.value.trim();
  getCountryData(query);
});

countryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = countryInput.value.trim();
    getCountryData(query);
  }
});
