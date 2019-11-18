/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');
import $ from 'jquery';

/**
 * require style imports
 */
import {getMovies, postMovie, putMovie} from './api'

$(document).ready(() => {

    let mainContainer = () => {
        return $("main");
    };
    // let modalLabel = () => {
    //     return $("#modalLabel");
    // };

    let titleInput = () => {
        return $("#titleInput");
    };

    let modalLabel = '';


    $("main").html("loading...");

    const renderMovieList = (title, rating, id) => {
        let content = `<div class="card">`;
        content += `<div class="card-header" id="heading${id}">`;
        // content += `<div class="card-header" id="heading` + id + ">";
        content += `<h5 class="mb-0">`;
        content += `<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">`;
        content += `${title} - rating: ${rating}`;
        content += `</button>`;
        content += `</h5>`;
        content += `</div>`;
        content += `<div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-parent="#accordian">`;
        content += `<div class="movie-content-container card-body">`;
        content += `<div class="movie-description">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>`;
        content += `<button type="button" id="editButton${id}" class="edit-button btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">
                    Edit
                </button>`;
        content += `<button type="button" id="deleteButton${id}" class="delete-button btn btn-danger btn-sm" data-toggle="modal" data-target="#modal">
                    Delete
                </button>`;
        content += `</div>`;
        content += `</div>`;
        content += `</div>`;


        return content
    };

    const renderList = (title = "Here are all the movies") => {
        getMovies().then((movieList) => {
            mainContainer().html(title);
            mainContainer().append(`<div id="accordion">`);
            movieList.forEach(({title, rating, id}) => {
                $("#accordion").append(renderMovieList(title, rating, id));

                function editLabel() {
                    modalLabel = 'Edit Movie';
                    $('#modalLabel').html(modalLabel)
                }
                $(".edit-button").click(editLabel);

                function deleteLabel() {
                    modalLabel = 'Delete Movie';
                    $('#modalLabel').html(modalLabel)
                }
                $(".delete-button").click(deleteLabel);

            //    placeholder if all else fails

            });
            mainContainer().append(`</div>`);
          function editLabel() {
            modalLabel = 'Edit Movie';
            console.log(modalLabel);
            $('#modalLabel').html(modalLabel)
            // modalLabel().html('Edit Movie')
          }
          $(".edit-button").click(editLabel);

          function deleteLabel() {
            modalLabel = 'Delete Movie';
            console.log(modalLabel);
            $('#modalLabel').html(modalLabel)
            // modalLabel().html('Edit Movie')
          }
          $(".delete-button").click(deleteLabel);
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
    };

    // getMovies().then((movies) => {
    //       console.log('Here are all the movies:');
    //       mainContainer().html("Here are all the movies:");
    //       mainContainer().append(`<div id="accordion">`);
    //       movies.forEach(({title, rating, id}) => {
    //         console.log(`id#${id} - ${title} - rating: ${rating}`);
    //         $("#accordion").append(renderMovieList(title, rating, id));
    //       });
    //       mainContainer().append(`</div>`);
    //     }).catch((error) => {
    //       alert('Oh no! Something went wrong.\nCheck the console for details.');
    //       console.log(error);
    //     });
    //     renderList("Here are all the movies:");
    renderList();

    $('#addButton').click(() => {
        $('#modalLabel').html('Add Movie');
    });

    $("#saveInput").click(function () {
        // console.log(modalLabel().html());
        if ($("#modalLabel").html() === "Add Movie") {
            console.log(titleInput().val());
            let something = {
                "title": titleInput().val(),
                "rating": $("#ratingInput").val()
            };
            let date = new Date();
            let udate = date.toLocaleString();
            console.log(udate);

            postMovie(something)
                .then((renderList(`Movie list updated: ${udate}`)));

            // postMovie(something)
            //     .then(getMovies)
            //     .then((movies) => {
            //         console.log('Here are all the movies:');
            //         mainContainer().html("Here are all the movies:");
            //         mainContainer().append(`<div id="accordion">`);
            //         movies.forEach(({title, rating, id}) => {
            //             console.log(`id#${id} - ${title} - rating: ${rating}`);
            //             $("#accordion").append(renderMovieList(title, rating, id));
            //         });
            //     }).catch((error) => {
            //     alert('Oh no! Something went wrong.\nCheck the console for details.');
            //     console.log(error);
            // });
        } else if ($("#modalLabel").html() === "Edit Movie"){
          console.log("We're editing");

            // let something = {
            //     "title": $("#titleInput").val(),
            //     "rating": $("#ratingInput").val()
            // };
            // putMovie(something)
            //     .then(getMovies)
            //     .then((movies) => {
            //         console.log('Here are all the movies:');
            //         $("main").html("Here are all the movies:");
            //         movies.forEach(({title, rating, id}) => {
            //             console.log(`id#${id} - ${title} - rating: ${rating}`);
            //             $("main").append(`${title} - rating: ${rating}`);
            //         });
            //     }).catch((error) => {
            //     alert('Oh no! Something went wrong.\nCheck the console for details.');
            //     console.log(error);
            // });
        }
    });
});