/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

let editMovie;
let movieRating;
let editRating;
let removeMovie;
let movieGenre;
let editGenre;

$("#remove-on-load").ajaxComplete(function(){
    $("#remove-on-load").css("display", "none");
});

//backup removal

// setTimeout(function(){
//     $('#remove-on-load').remove();
// }, 3700);

//populates Movie List
const movies = () =>
  getMovies().then((movies) => {
  // console.log('Here are all the movies:');
  $('#movies').html ("");
  let movieList = " <tr>\n" +
      "<th>Movies</th>\n" +
      "<th>Rating</th>\n" +
      "<th>Genre</th>\n" + "</tr>";
  movies.forEach(({title, rating, genre, id}) => {
        movieList += '<tr>';
          movieList += `<td>${title}</td>`;
          movieList += `<td>${rating}</td>`;
          movieList += `<td>${genre}</td>`;
        movieList += '</tr>';
    console.log(`id#${id} - ${title} - rating: ${rating} -genre ${genre}`);
  });
  $(movieList).appendTo('#movies')
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
movies();

//Movie rating function
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
  movieRating.then($("#submit").removeAttr("disabled"));
});

//editing star ratings
$("select#editRating").change(function(){
  editRating = $(this).children("option:selected").val();
});

//adding genre
$("select#movieGenre").change(function(){
    movieGenre = $(this).children("option:selected").val();
});

//editing genre
$("select#editGenre").change(function(){
    editGenre = $(this).children("option:selected").val();
});

//updating movie list
$('#submit').click(function(e){
  e.preventDefault();
  const movieTitle = $('#movieName').val();
  const submittedMovies = {
    title: movieTitle,
    rating: movieRating,
      genre: movieGenre
  };
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submittedMovies)
  };
  fetch(url, options)
      .then(movies)
      .then(editMovies)
      .then(removeMovies);
  $('#movieName').val('');
  $('#movieRating').val('');
  $('#movieGenre').val('');
});


//edit rating for movies
const editMovies = () =>
    getMovies().then((movies) => {
      console.log("Can you see the movies?");
      $('#editMovies').html('');
      let movieEdit = "<option>Select a Movie</option>";
      movies.forEach(({title, rating}) => {
        movieEdit += `<option value="${title}">${title}</option>`;
      });
      $(movieEdit).appendTo('#editMovies').then($("#editSubmit").removeAttr("disabled"))
    })
    //for editing movies option
        .then($("select#editMovies").change(function(){
          editMovie = $(this).children('option:selected').val();
          console.log(editMovie)
        }))
        .catch((error) => {
          console.log(error);
        });
editMovies();

//update with new rating
$('#editSubmit').click(function (e) {
  e.preventDefault();
  getMovies().then((moviesData) => {
    moviesData.forEach(({title, rating, genre, id}) => {
      if (editMovie ===  title) {
        const submittedMovies = {
          title: editMovie,
          rating: editRating,
            genre: editGenre
        };
        const url = '/api/movies/' + id;
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submittedMovies)
        };
        fetch(url, options)
            .then(movies)
            .then(editMovies)
            .then(removeMovies);
      }
    });
  });
});

//Movie deletion
const removeMovies = () =>
    getMovies().then((movies) => {
      $('#removeMovies').html('');
      let movieDelete = "<option>Select the Movie You Want to Remove</option>";
      movies.forEach(({title, rating, id}) => {
        movieDelete += `<option value="${title}">${title}</option>`;
      });
      $(movieDelete).appendTo('#removeMovies').then(('#removeSubmit'))
    })
        .then($("select#removeMovies").change(function(){
          removeMovie = $(this).children('option:selected').val();
          console.log(removeMovie)
        }))
        .catch((error) => {
          console.log(error);
        });
removeMovies();

//removal on submit
$('#removeSubmit').click(function(e){
  e.preventDefault();
  getMovies().then((moviesData) => {
    moviesData.forEach(({title, rating, genre, id}) => {
      if (removeMovie === title) {
        const submittedMovies = {
          title: title,
          rating: rating,
            genre: genre
        };
        const url = '/api/movies/' + id;
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submittedMovies)
        };
        fetch(url, options)
            .then(movies)
            .then(editMovies)
            .then(removeMovies);
      }
    })
  })
});

//removes text after load

// $("#movies").load(function() {
//     $("#remove-on-load").hide();
// });

// $(document).ajaxSuccess(function() {
//     $( "#remove-on-load" ).html( "Triggered ajaxSuccess handler." );
// });




// const url = '../db.json';
// const options = {
//   method: 'GET',
//   // movies,
//   body: JSON.stringify(getMovies),
//
// };
// fetch(url, options)
// let html = ''

//
//       movies.forEach(function(movie){
//
//       }))