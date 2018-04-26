'use strict';
const $ = require('jquery');
import sayHello from './hello.js';
sayHello('World');

const post = require('./api.js');

$(".loader").css("display", "block");
    function createCards() {
         $(".row").html("Loading....");
             post.getMovies().then((movies) => {
                 $(".loader").css("display", "none");
                 console.log('Here are all the movies:');
                 $(".row").html("");
                 movies.forEach(({title, rating, id}) => {
                    $(".row").append(`<div class="col-4">
                    <div class="card">
                         <div class="card-body">
                         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal${id}"> Edit</button>
                         <button type="button"  data-id="${id}" class="btn btn-danger delete">X</button>
                         <h5 class="card-title"><em>Movie Title: </em><br>${title}</h5>
                         <p class="card-subtitle"> ${rating} Stars</p>
                         <p class="dbId">${id}</p>
                     </div>
                 </div>
             </div>`);
             $("body").append(`<div class="modal fade" id="modal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                         <div class="modal-header">
                         <h5 class="modal-title" id="exampleModalLabel">Ediit your movie.</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         </div>
                        <div class="modal-body">
                             <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="${title}">
                                    <small id="emailHelp" class="form-text text-muted">Change your movie.</small>
                                </div>
                                <div class="form-group">
                                    <form>
   
                                    <div class="form-group">
                                         <label for="exampleInputPassword1">Rating</label>
                                         <input type="text" class="form-control" id="exampleInputPassword1" value="${rating}">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
          
                                 </div>
                                 <div class="modal-footer">
                                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                     <button  id="editMovies" class="btn btn-primary btn">Save changes</button>
                                 </div>
                             </div>
                        </div>
                    </div>`)});
                 }).catch((error) => {
                alert('Oh no! Something went wrong.\nCheck the console for details.');
                console.log(error);
                });
             }
            createCards();

$('#addMovie').click((e) => {
    e.preventDefault();
    console.log('test');
    const title = $('input').val();
    const rating = $('select').val();
    post.addMovies({title: title, rating: rating});
    setTimeout(function(){
        createCards();
    }, 1200);
});


$('.row').on('click', '.delete', (e)=>{
    e.preventDefault();
    console.log($(e.target).data('id'));
    $(e.target).parent('h1').remove();
    post.deleteMovies($(e.target).data('id')).then(movie => {
        $(e.target).parent().slideUp('slow', function() {$(this).remove();});
        setTimeout(function(){
            createCards();

        }, 300)
    });

});


