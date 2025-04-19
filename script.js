const form = document.getElementById('search-form');
const input = document.getElementById('movie-search');
const movieList = document.getElementById('movie-list');
const detailsSection = document.getElementById('movie-details');
const detailsContent = document.getElementById('details-content');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = input.value;

    fetch('https://freetestapi.com/api/v1/movies?search=${query}')
        .then(response => response.json())
        .then(data => {
            movieList.innerHTML = "";

            if (data.length > 0) {
                data.forEach(movie => {
                    const li = document.createElement("li");
                    li.textContent = `${movie.name} (${movie.year})`;
                    li.addEventListener("click", function () {
                        fetch('https://freetestapi.com/api/v1/movies/${movie.id}')
                            .then(response => response.json())
                            .then(movieDetails => {
                                showMovieDetails(movieDetails);
                            })
                            .catch(error => {
                                detailsContent.innerHTML = "<p>Error loading movie details.</p>";
                                console.error("Details Error:", error);
                            });
                    });
                    movieList.appendChild(li);
                });
            } else {
                movieList.innerHTML = "<li>No results found.</li>";
            }
        })
        .catch(error => {
            movieList.innerHTML = "<li>Error fetching data.</li>";
            console.error("Search Error:", error);
        });
});

function showMovieDetails(movie) {
    detailsContent.innerHTML = `
        <h3>${movie.name}</h3>
        <p><strong>Year:</strong> ${movie.year}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Description:</strong> ${movie.description}</p>
    `;
    detailsSection.hidden = false;
}
