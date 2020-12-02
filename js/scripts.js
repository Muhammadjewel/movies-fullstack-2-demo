var bookmarkedMovies = JSON.parse(localStorage.getItem('local-bookmarks')) || [];


var elSearchForm = $_('.js-search-form');
var elSearchTitleInput = $_('.js-search-form__title-input', elSearchForm);
var elSearchRatingInput = $_('.js-search-form__rating-input', elSearchForm);
var elSearchGenreSelect = $_('.js-search-form__genre-select', elSearchForm);
var elSearchSortSelect = $_('.js-search-form__sort-select', elSearchForm);

var elSearchResults = $_('.search-results');
var elBookmarkedMovies = $_('.bookmarked-movies');

var elMovieInfoModal = $_('.movie-info-modal');
var elMovieInfoModalTitle = $_('.movie-info-modal__title', elMovieInfoModal);

var elSearchResultTemplate = $_('#search-result-template').content;
var elBookmarkedMovieTemplate = $_('#bookmarked-movie-template').content;


var createGenreSelectOptions = function () {
  var movieCategories = [];

  normalizedMovies.forEach(function (movie) {
    movie.categories.forEach(function (category) {
      if (!movieCategories.includes(category)) {
        movieCategories.push(category);
      }
    });
  });

  movieCategories.sort();

  var elOptionsFragment = document.createDocumentFragment();

  movieCategories.forEach(function (category) {
    // var elCategoryOption = document.createElement('option');
    // elCategoryOption.textContent = category;
    var elCategoryOption = createElement('option', '', category);
    elCategoryOption.value = category;

    elOptionsFragment.appendChild(elCategoryOption);
  });

  elSearchGenreSelect.appendChild(elOptionsFragment);
};

createGenreSelectOptions();

/*
ES5
elSearchForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
*/
var renderResults = function (searchResults, searchRegex) {
  elSearchResults.innerHTML = '';

  var elResultsFragment = document.createDocumentFragment();

  searchResults.forEach((movie) => {
    var elMovie = elSearchResultTemplate.cloneNode(true);

    $_('.search-results__item', elMovie).dataset.imdbId = movie.imdbId;
    $_('.movie__poster', elMovie).src = movie.smallPoster;

    // TODO - simplify
    if (searchRegex.source === '(?:)') {
      $_('.movie__title', elMovie).textContent = movie.title;
    } else {
      $_('.movie__title', elMovie).innerHTML = movie.title.replace(searchRegex, `<mark class="px-0">${movie.title.match(searchRegex)}</mark>`);
    }

    $_('.movie__year', elMovie).textContent = movie.year;
    $_('.movie__rating', elMovie).textContent = movie.imdbRating;
    $_('.movie__trailer-link', elMovie).href = movie.trailer;

    elResultsFragment.appendChild(elMovie);
  });

  elSearchResults.appendChild(elResultsFragment);
};

var sortObjectsAZ = function (array) {
  return array.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    }
    return 0;
  });
};

// VARIANT A
/* var sortObjectsHighToLowRating = function (array) {
  return array.sort(function (a, b) {
    if (a.imdbRating > b.imdbRating) {
      return -1;
    } else if (a.imdbRating < b.imdbRating) {
      return 1;
    }
    return 0;
  });
}; */

// VARIANT B
var sortObjectsHighToLowRating = function (array) {
  return array.sort(function (a, b) {
    return b.imdbRating - a.imdbRating;
  });
};

// VARIANT D
/* var sortObjectsHighToLowRating = (array) => {
  return array.sort(function (a, b) {
    return b.imdbRating - a.imdbRating;
  });
}; */

// VARIANT E
/* var sortObjectsHighToLowRating = (array) => {
  return array.sort((a, b) => {
    return b.imdbRating - a.imdbRating;
  });
}; */

// VARIANT F
/* var sortObjectsHighToLowRating = (array) => {
  return array.sort((a, b) => b.imdbRating - a.imdbRating);
}; */

// VARIANT G
/* var sortObjectsHighToLowRating = (array) => array.sort((a, b) => b.imdbRating - a.imdbRating); */

// VARIANT H
/* var sortObjectsHighToLowRating = array => array.sort((a, b) => b.imdbRating - a.imdbRating); */

var sortObjectsNewToOld = function (array) {
  return array.sort(function (a, b) {
    return b.year - a.year;
  });
};

var sortSearchResults = function (results, sortType) {
  // TODO - create sorting function that accepts array of objects and sorting property
  if (sortType === 'az') {
    return sortObjectsAZ(results);
  } else if (sortType === 'za') {
    return sortObjectsAZ(results).reverse();
  } else if (sortType === 'rating_desc') {
    return sortObjectsHighToLowRating(results);
  } else if (sortType === 'rating_asc') {
    return sortObjectsHighToLowRating(results).reverse();
  } else if (sortType === 'year_desc') {
    return sortObjectsNewToOld(results);
  } else if (sortType === 'year_asc') {
    return sortObjectsNewToOld(results).reverse();
  }
};

var findMovies = function (title, minRating, genre) {
  return normalizedMovies.filter((movie) => {
    var doesMatchCategory = genre === 'All' || movie.categories.includes(genre);

    return movie.title.match(title) && movie.imdbRating >= minRating && doesMatchCategory;
  });
};


// Arrow function
elSearchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  var searchTitle = elSearchTitleInput.value.trim();
  var movieTitleRegex = new RegExp(searchTitle, 'gi');
  var minimumRating = Number(elSearchRatingInput.value);
  var genre = elSearchGenreSelect.value;
  var sorting = elSearchSortSelect.value;

  /* var searchResults = sortSearchResults(findMovies(movieTitleRegex, minimumRating, genre), sorting); */

  var searchResults = findMovies(movieTitleRegex, minimumRating, genre);
  searchResults = sortSearchResults(searchResults, sorting);

  renderResults(searchResults, movieTitleRegex);
});

var updateMovieModalContent = function (movie) {
  elMovieInfoModalTitle.textContent = movie.title;
};

var showMovieModal = function (eventTarget) {
  var movieImdbId = eventTarget.closest('.search-results__item').dataset.imdbId;

  // ES5
  /* var foundMovie = normalizedMovies.find(function (movie) {
    return movie.imdbId === movieImdbId;
  }); */

  // ES6 - dubl 1
  /* var foundMovie = normalizedMovies.find((movie) => {
    return movie.imdbId === movieImdbId;
  }); */

  // ES6 - dubl 2
  /* var foundMovie = normalizedMovies.find(movie => {
    return movie.imdbId === movieImdbId;
  }); */

  // ES6 - dubl 3
  /* var foundMovie = normalizedMovies.find(movie => movie.imdbId === movieImdbId); */

  // ES6 - dubl 4
  let foundMovie = normalizedMovies.find(movie => movie.imdbId === movieImdbId);

  updateMovieModalContent(foundMovie);
};

var renderBookmarkedMovies = function () {
  elBookmarkedMovies.innerHTML = '';

  var elBookmarkedMoviesFragment = document.createDocumentFragment();

  bookmarkedMovies.forEach(function (movie) {
    var elBookmarkedMovie = elBookmarkedMovieTemplate.cloneNode(true);

    $_('.bookmarked-movie__title', elBookmarkedMovie).textContent = movie.title;
    $_('.js-remove-bookmarked-movie-button', elBookmarkedMovie).dataset.imdbId = movie.imdbId;

    elBookmarkedMoviesFragment.appendChild(elBookmarkedMovie);
  });

  elBookmarkedMovies.appendChild(elBookmarkedMoviesFragment);
};

renderBookmarkedMovies();

var updateLocalBookmarks = function () {
  localStorage.setItem('local-bookmarks', JSON.stringify(bookmarkedMovies));
};

var bookmarkMovie = function (movie) {
  bookmarkedMovies.push(movie);

  updateLocalBookmarks();
  renderBookmarkedMovies();
};

elSearchResults.addEventListener('click', (evt) => {
  // TODO - bosilgan tugmadan turib kinoning id sini topishni alohida funksiyaga joylash

  if (evt.target.matches('.js-movie-modal-opener')) {
    showMovieModal(evt.target);
  } else if (evt.target.matches('.js-movie-bookmark')) {

    var movieImdbId = evt.target.closest('.search-results__item').dataset.imdbId;
    let foundMovie = normalizedMovies.find(movie => movie.imdbId === movieImdbId);

    var isBookmarked = bookmarkedMovies.find((movie) => {
      return movie.imdbId === foundMovie.imdbId;
    });

    if (!isBookmarked) {
      bookmarkMovie(foundMovie);
    }
  }
});

elBookmarkedMovies.addEventListener('click', (evt) => {
  if (evt.target.matches('.js-remove-bookmarked-movie-button')) {
    var movieImdbId = evt.target.dataset.imdbId;

    // var kinoIndeksi;
    var kinoIndeksi = bookmarkedMovies.findIndex(function (movie) {
      return movie.imdbId === movieImdbId;
    });

    // var kinoIndeksi = bookmarkedMovies.indexOf(kino);

    bookmarkedMovies.splice(kinoIndeksi, 1);

    updateLocalBookmarks();
    renderBookmarkedMovies();
  }
});
