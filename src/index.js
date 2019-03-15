/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// setTimeout(function () {
//   sayHello('World');
// }, 1000);


/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const {postMovies} = require('./api.js');

getMovies().then((movies) => {
  // console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {

    $('#movies').append(getHTML(title, rating, id));
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

const getHTML = function(title, rating, id) {
  let html = `<div class="col-6">`;
      html += `<div class="row">`;
      html += `<h2>${title}</h2><p><strong>`;
      html+= `</strong>Rating:`;
      html += `${rating}</p></div>`;
      html += `<button id="edit" class="btn btn-warning mr-4 row" type="submit">Edit</button>
            <button id="delete" class="btn btn-danger mr-4 row" type="submit">Delete</button>`;
      html += `</div>`;

    return html;
};

const addMovie = () =>
    $('#submit').on('click', function() {

        const newMovie = {
            title: $('#title').val(),
            rating: $('input[name = rating]:checked').val(),
        };

        postMovies(newMovie);
        getMovies().then((movies) => {
            // console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => {

                $('#movies').append(getHTML(title, rating, id));
                // console.log(`id#${id} - ${title} - rating: ${rating}`);
            });
        });
    });

addMovie();