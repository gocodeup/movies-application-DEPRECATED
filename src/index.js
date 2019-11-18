/**
 * es6 modules and imports
 */
// import sayHello from './hello.js';
// sayHello('World');

/**
 * require style imports
 */
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

// import {getMovies, getMovie, postMovie, patchMovie, deleteMovie} from "./api" ;
// const {getMovies} = require('./api.js');

// fetch("./api.js").then();

getMovies().catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});// let movies = getMovies();

getMovie(1)
    .then(movie => {
      console.log("Making a request to a single book");
      console.log(`Title:${movie.title} Rating: ${movie.rating}`);
    })
    .catch(() => console.log('The important thing is you tried...'));


let moviesDiv = document.getElementById("container");
moviesDiv.innerHTML = "<img src='./lookofhope.gif' alt='loading'>";

getMovies().then((result) => {
    console.log(result);
    moviesDiv.innerHTML = "<p> HELLO </p>";
});

// const showMovies = () => {
//   let div = document.getElementById("container");
//   // div.innerHTML = "";
//   console.log(div);
//   for (let i = 0; i < movies.length ;i++){
//     let cont = "<div class='movie-card'>";
//     cont += `<p>Movie title: ${THEMOVIES[i].title}</p>`;
//     cont += `<p>Movie rating: ${THEMOVIES[i].rating}/5</p></div>`;
//     div.innerHTML = cont;
//     console.log(div.innerHTML);
//   }
// };

// showMovies();
// deleteMovie(6);

//     .then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// });

// for (let i = 3; i < getMovies(); i++){
//   deleteMovie([i]).then(getMovies).then((movies) => {
//     movies.forEach(({title, rating}) => {
// deleteMovie(4);
//     });

//.then((movies) => {
//   console.log('Here are all the books:');
//   movies.forEach(({title, rating}) => {
//     console.log(`${title} by ${rating}`);
//   });
// })
//   }).catch((error) => {
//     alert('Oh no! Something went wrong.\nCheck the console for details.');
//     console.log(error);
//   });
// }


// const makeMovie = (title, rating) => {
//   return {
//     "title" : title,
//     "rating" : rating
//   };
// };

// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(movie),
// };

// console.log(makeMovie("LOTR", 6));
//
// fetch("http://localhost:1313/", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(makeMovie("LOTR", 6)),
// }).then().catch(() => {console.log("FUCC")});

function generateCards(title, rating) {
    let card;
    card = "";
    for(i = 0;i < 3; i++)
    card += `<div class="card">`;
    card += `<img src="..." class="card-img-top" alt="...">`;
    card += `<div class="card-body">`;
    card += `<p class="card-text">$(title) - $(rating)</p>`;
    card += `"</div></div>"`;
}

// getMovies().then((movies) => {
//     console.log('Here are all the movies:');
//     movies.forEach(({title, rating}) => {
//         console.log(`id#${id} - ${title} - rating: ${rating}`);
//         let newTitle = `${title}`;
//         let newRating = `${rating}`;
//         makeCard(newTitle, newRating);
//     });
// }).catch((error) => {
//     alert('Oh no! Something went wrong.\nCheck the console for details.');
//     console.log(error);
// });
