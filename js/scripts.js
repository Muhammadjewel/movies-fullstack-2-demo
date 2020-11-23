// function
// Uncategorized, Documentary, Music, Adventure, Animation, Comedy, Family, Fantasy, Horror, Drama, Sport, Romance, Action, Sci-Fi, News

// sort

// movie.match(qidiruv) && movie.rating >= berilganReyting && movie.categores.includes(bizSuraganKategoriya)


/*
Commented out as the data is saved in normalized-movies.js file in a normalizedMovies variable

var normalizedMovies = movies.map(function (movie) {
  return {
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|'),
    summary: movie.summary,
    imdbId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailer: getYoutubeVideoLink(movie.ytid),
    bigPoster: getYoutubeVideoBigThumbnail(movie.ytid),
    smallPoster: getYoutubeVideoThumbnail(movie.ytid)
  };
});
*/



// DOM

var elSearchForm = $_('.js-search-form');
var elSearchTitleInput = $_('.js-search-form__title-input', elSearchForm);
var elSearchRatingInput = $_('.js-search-form__rating-input', elSearchForm);
var elSearchGenreSelect = $_('.js-search-form__genre-select', elSearchForm);
var elSearchSortSelect = $_('.js-search-form__sort-select', elSearchForm);

var elSearchResultTemplate = $_('#search-result-template').content;


var createGenreSelectOptions = function () {
  var movieCategories = [];

  normalizedMovies.slice(0, 50).forEach(function (movie) {
    movie.categories.forEach(function (category) {
      if (!movieCategories.includes(category)) {
        movieCategories.push(category);
      }
    });
  });

  // select ichiga fragmentga solingan janrlar optionlarini solish
};

createGenreSelectOptions();
