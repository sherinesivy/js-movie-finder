const API_KEY = '9dd256bb3ab857753f1c85443297d165';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const moviesContainer = document.getElementById('moviesContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNum = document.getElementById('pageNum');


const modal = document.getElementById('movieModal');
const closeModal = document.getElementById('closeModal');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalRating = document.getElementById('modalRating');
const modalOverview = document.getElementById('modalOverview');
const modalRelease = document.getElementById('modalRelease');


let currentPage = 1;
let currentQuery = '';

async function fetchMovies(query, page) {
    let url;
    if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    } else {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
    pageNum.textContent = `Page ${page}`;
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach (movie => {
        if (!movie.poster_path) return;
        const card =document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
        <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
        `;
        card.addEventListener('click', () => openModal(movie));
        moviesContainer.appendChild(card);
    })
}

fetchMovies(currentQuery, currentPage);


searchBtn.addEventListener('click', () => {
    currentQuery = searchInput.value;
    currentPage = 1;
    fetchMovies(currentQuery, currentPage);
})



nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchMovies(currentQuery, currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

window.scrollTo({ top: 0, behavior: 'smooth' });

prevBtn.addEventListener('click',() => {
    if (currentPage>1) {
        currentPage--;
        fetchMovies(currentQuery, currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
} )


function openModal(movie) {
    modalPoster.src = `${IMG_URL}${movie.poster_path}`;
    modalTitle.textContent = movie.title;
    modalRating.textContent = `⭐ ${movie.vote_average}`;
    modalOverview.textContent = movie.overview;
    modalRelease.textContent = `📅 Release Date: ${movie.release_date}`;
    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});