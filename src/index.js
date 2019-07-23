
import data from './api';

const $ = require('jquery');


//displays movies

data.getMovies()
// .then(response =>response.json())
.then(data => console.log(data));

// client view

function postFavorites(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].title, data[i].rating);
    let title = data[i].title;
    let rating = data[i].rating;
    let id = data[i].id;
    html += '<div >';
    html += '<div >';
    html += `<h4>${title}</h4>`;
    html += '</div>';
    html += '<div >';
    html += `<h5 >${rating}</h5>`;
    html += '</div>';
    html += `<input type="submit" class="delete" data-dbid="${id}" value="Delete Movie">`;
    html += `<input type="submit" data-toggle='modal' data-target="#editModal" class="edit" id="edit" data-dbid="${id}" value="Edit Movie">`;
    html += '</div>'
  }
  $('#favoritesList').html(html);
}

  data.displayFavorites().then(data => postFavorites(data));


//add button functionality

$('#addMovieBtn').on('click',function() {
  let title = $('#inputTitle').val();
  // console.log(title);
  let rating = $('input[name="rating"]:checked').val();
  console.log($('input[name="rating"]:checked').val());
  data.addMovies();
  $('#inputTitle').val('');//resets the input
  Array.from(document.querySelectorAll('input[name="rating"]:checked'), input => input.checked = false);//resets rating
  data.displayFavorites().then(data => postFavorites(data));
});

//delete button functionality

$(document).on('click', ".delete", function(){
  // console.log('delete!');
  let id = $(this).attr('data-dbid');
  // console.log(id);
data.deleteMovies(id);
  data.displayFavorites().then(data => postFavorites(data));
});

//edit functionality

$(document).on('click', '.edit', function() {
  console.log('edit');
  let id = $(this).attr('data-dbid');//works correctly
  console.log(id);
  data.editMovies(id);
});

$(document).on('click', '.updateMovieBtn', function(){
  data.displayFavorites().then(data => postFavorites(data))

});
//













