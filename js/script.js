///////////////
//VARIABLES
///////////////
const url = "https://anime-db.p.rapidapi.com/anime?page=1&size=100&search="
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


///////////////
//EVENT LISTENERS
///////////////
$form.on('submit', getData)

///////////////
//FUNCTIONS
///////////////
function getData(e){
    e.preventDefault();
    userinput = $input.val();
    $.ajax({url: url+userinput, headers}).then(
        (data) => {
        $title.text(data.data[0].title)
        $epin.text(data.data[0].episodes)
        $mov.text(data.data[0].type)
        $run.text(data.data[0].status)
        $sum.text(data.data[0].synopsis)
        $atitle.text(data.data[0].alternativeTitles[0])
            console.log(data)
            $("main>div").html(`<img id='movieImg' src="${data.data[0].image}" />`);
        }, (error) => {
            console.log('this one is wrong', error)
        }
    )
}