"use strict";
/**
 * es6 modules and imports
 */
const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');
function editHtml () {
    getMovies().then((movies) => {
        $('#output').html(null);
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log((`id# ${id} - ${title} - rating: ${rating}`));
            $('#output').append(`<br> ${title} <br> rating: ${rating}<br>`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}
editHtml();

$('#movieSubmit').click(function () {
  let movie = {
    title: $('#title').val(),
    rating: $('#rating').val()
  };

  addMovie(movie);
  editHtml();
});

$('#movieChange').click(function(){
    let movieEdit = {
        title: $('#newTitle').val(),
        rating: $('#newRating').val()
    };
    let movieTitle = $('#editTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movieTitle.toLowerCase()))
        .then(item => {
            editMovie(item[0].id, movieEdit);
            editHtml();
        });
});

$('#movieDelete').click(function(){
  let movie = $('#deleteTitle').val();
 getMovies()
      .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
      .then(item => {
        deleteMovie(item[0].id);
        editHtml();
      });
  });

