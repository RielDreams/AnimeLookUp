////////////
//iife
///////////
// $(function(){ 

///////////////
//VARIABLES
///////////////
//MAX SEARCH 25000
    const url = "https://anime-db.p.rapidapi.com/anime?page=1&size=500&search="
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
    const $section = $('section')

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
                render(data.data)
                console.log(data)
            }, (error) => {console.log("this isnt working", error)
        })
    }

    function render(shows) {
        const showList = shows.map(list => {   
            return  `<div id="page">
                    <div id="poster" class="group"><img id='movieImg' src="${list.image}"/></div>
                    <div id="info">
                        <p id="title" class="group">${list.title}</p>
                        <p id="epiC" class="group">Episode Count:</p>
                        <p id="epiN" class="group">${list.episodes}</p>
                        <p id="type"class="group">Type:</p>
                        <p id="mov" class="group">${list.type}</p>
                        <p id="air" class="group">Still Airing:</p>
                        <p id="run" class="group">${list.status}</p>
                        <p id="synopsis" class="group">Summary:</p>
                        <p id="sum" class="group">${list.synopsis}</p>
                    </div>
                    </div>`
        });
        $section.html(showList)
        }
// })