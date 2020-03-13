const $ = require('jquery');


/**
 * es6 modules and imports
 */
import sayHello  from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie} = require('./api.js');

$('#submit').click(function (e) {
e.preventDefault();
addMovie();
});

$('#submitEdit').click(function (e) {
  e.preventDefault();
  editMovie($('#idNumber').val());
  console.log($('#idNumber').val());
});

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#movies').append(
        `<li>id#${id} - ${title} - rating: ${rating}</li>`
    )
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});




$('#movies > li').click(function() {
  $(this).toggleClass('highlighted');
});