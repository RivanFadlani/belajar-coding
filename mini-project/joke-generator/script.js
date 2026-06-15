const jokeText = document.getElementById("joke-text");
const jokeBtn = document.getElementById("joke-btn");

async function getJoke() {
  document.getElementById("joke-btn").disabled = true;
  jokeBtn.textContent = "Loading...";

  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Lucu lu SUKI");
    }

    const data = await response.json();

    jokeText.textContent = data.joke;
  } catch (error) {
    jokeText.textContent = error.message;
  } finally {
    document.getElementById("joke-btn").disabled = false;
    jokeBtn.textContent = "Klik Guah";
  }
}

jokeBtn.addEventListener("click", getJoke);
