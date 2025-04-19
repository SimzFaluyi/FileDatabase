const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) return;

  results.innerHTML = "<p>Searching...</p>";

  const proxy = "https://cors-anywhere.herokuapp.com/";
  let apiURL;

  if (!isNaN(query)) {
    // Film ID search
    apiURL = `https://freetestapi.com/api/v1/movies/${query}`;
  } else {
    // Film Name search
    apiURL = `https://freetestapi.com/api/v1/movies?search=${query}`;
  }

  fetch(proxy + apiURL)
    .then(res => {
      if (!res.ok) throw new Error("Fetch error");
      return res.json();
    })
    .then(data => {
      results.innerHTML = "";

      // If search returned a list
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(movie => {
            const div = document.createElement("div");
            div.classList.add("result-item", "fade-in");
            div.innerHTML = `
              <h3>${movie.title}</h3>
              <p><strong>Year:</strong> ${movie.year}</p>
              <p><strong>Genre:</strong> ${movie.genre}</p>
              <p><strong>Director:</strong> ${movie.director}</p>
              <p><strong>Rating:</strong> ${movie.rating}/10</p>
            `;
            div.addEventListener("click", () => {
                window.location.href = `movie.html?id=${movie.id}`;
            });
            results.appendChild(div);
        });
      } 
      // If search by ID returns one movie object
      else if (data.title) {
        const div = document.createElement("div");
        div.classList.add("result-item", "fade-in");
        div.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Year:</strong> ${data.year}</p>
            <p><strong>Genre:</strong> ${data.genre}</p>
            <p><strong>Director:</strong> ${data.director}</p>
            <p><strong>Rating:</strong> ${data.rating}/10</p>
        `;
        div.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });
        results.appendChild(div);
      } 
      else {
        results.innerHTML = "<p>No movie found.</p>";
      }
    })
    .catch(err => {
      results.innerHTML = "<p>Error fetching movie. Try again later.</p>";
      console.error("Fetch error:", err);
    });
});
