///////////////
//VARIABLES
///////////////
const url = "https://anime-db.p.rapidapi.com/anime?page=1&size=100&search=dragon%20ball"
const headers = {
    'X-RapidAPI-Key': '80d0039c26mshef3d1e749d687d2p150054jsnfed47181c459',
    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }

///////////////
//ELEMENTS
///////////////
let $poster = $('#poster')
let $title = $('#title')
let $epin = $('#epiN')
let $mov = $('#mov')
let $run = $('#run')
let $sum = $('#sum')
let $atitle = $('#aTitle')
const $form = $('form');
const $input = $('input[type="text"]');
const userinput = $input.val()

///////////////
//EVENT LISTENERS
///////////////
$form.on('submit', getData)

///////////////
//FUNCTIONS
///////////////
function getData(e){
    e.preventDefault();
    $.ajax({url, headers}).then(
        (data) => {
            console.log(data)
            $("main>div").html(`<img id='movieImg' src="${data.data[0].image}" />`);
        }, (error) => {
            console.log('this one is wrong', error)
        }
    )
}