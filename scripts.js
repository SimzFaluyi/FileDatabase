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
    // Treat as an Film ID Search
    apiURL = `https://freetestapi.com/api/v1/movies/${query}`;
  } else {
    // Treat as an Film Name Search
    apiURL = `https://freetestapi.com/api/v1/movies?search=${query}`;
  }

  fetch(proxy + apiURL)
    .then(res => {
      if (!res.ok) throw new Error("Fetch error");
      return res.json();
    })
    .then(data => {
      results.innerHTML = "";

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(movie => {
          const div = document.createElement("div");
          div.innerHTML = `
            <h3 class="fade-in">${movie.title}</h3>
            <p class="fade-in"><strong>Year:</strong> ${movie.year}</p>
            <p class="fade-in"><strong>Genre:</strong> ${movie.genre}</p>
            <p2 class="fade-in"><strong>Director:</strong> ${movie.director}</p>
            <p3 class="fade-in"><strong>Plot:</strong> ${movie.plot}</p>
            <p3 class="fade-in"><strong>Rating:</strong> ${movie.rating}/10</p>
            <hr/>
          `;
          results.appendChild(div);
        });
      } else if (data.title) {
        results.innerHTML = `
          <h3>${data.title}</h3>
          <p class="fade-in"><strong>Year:</strong> ${data.year}</p>
          <p class="fade-in"><strong>Genre:</strong> ${data.genre}</p>
          <p class="fade-in"><strong>Director:</strong> ${data.director}</p>
          <p class="fade-in"><strong>Plot:</strong> ${data.plot}</p>
          <p class="fade-in"><strong>Rating:</strong> ${data.rating}/10</p>
        `;
      } else {
        results.innerHTML = "<p>No movie found.</p>";
      }
    })
    .catch(err => {
      results.innerHTML = "<p>Error fetching movie. Try again later.</p>";
      console.error("Fetch error:", err);
    });
});
