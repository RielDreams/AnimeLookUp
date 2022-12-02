////////////
//iife
///////////
// $(function(){ 


///////////////
//ELEMENTS
///////////////
    let limit = 500;
    let xr = 0;
    const $poster = $('#poster');
    const $title = $('#title');
    const $epin = $('#epiN');
    const $mov = $('#mov');
    const $run = $('#run');
    const $sum = $('#sum');
    const $atitle = $('#aTitle');
    const $form = $('form');
    const $input = $('input[type="text"]');
    const $section = $('#showroom');
    const $random = $('#random');
    const $hidden = $('#hidden');
    const $randomb = $('#randomButton');

///////////////
//VARIABLES
///////////////
//MAX SEARCH 25000
const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=${limit}&search=`
const headers = {
    'X-RapidAPI-Key': '80d0039c26mshef3d1e749d687d2p150054jsnfed47181c459',
    'X-RapidAPI-Host': 'anime-db.p.1'
    }


///////////////
//EVENT LISTENERS
///////////////
    $form.on('submit', getData)
    $random.click(randomClick)

///////////////
//FUNCTIONS
///////////////
    function getData(e){
        e.preventDefault();
        userinput = $input.val();
        $input.val('');
        $.ajax({url: url+userinput, headers}).then(
            (data) => {
                render(data.data)
                // console.log(data)
            }, (error) => {console.log("this isnt working", error)
        })
    };
    function render(shows) {
        const showList = shows.map((list, i) => {  
                return  `<div id="page">
                <div id="poster" class="group">
                    <a href="#ex${i}" rel="modal:open">
                        <img id='movieImg' src="${list.image}"/>
                    </a>
                </div>
                <div id="ex${i}" class="modal">
                    <img id='movieImg' src="${list.image}"/>
                    <p id="title" class="group">${list.title}</p>
                    <p id="epiC" class="group">Episode Count:  ${list.episodes}</p>
                    <p id="type"class="group">Type:   ${list.type}</p>
                    <p id="air" class="group">Still Airing:   ${list.status}</p>
                    <p id="synopsis" class="group">Summary:</p>
                    <p id="sum" class="group">${list.synopsis}</p>
                </div>
                </div>`      
        });
        $section.html(showList)
    }

        ///////
        //RANDOM DATA LOADS AUTOMATICALLY
        //////

    function randomClick() {
        x = Math.floor(Math.random() * limit)
        $('#randomButton').attr(`href`,`#x${x}`);
        xr = xr + x
        console.log(xr)
        return xr = 0
    }

    function randomData(){
        $.ajax({url, headers}).done(
            (data) => {
                randomDat(data.data)
            })
    }
    function randomDat(view){
            const randomEn = view.map((list, i) => {
                return  `
                <div id="x${i}" class="modal">
                    <img id='movieImg' src="${list.image}"/>
                    <p id="title" class="group">${list.title}</p>
                    <p id="epiC" class="group">Episode Count:  ${list.episodes}</p>
                    <p id="type"class="group">Type:   ${list.type}</p>
                    <p id="air" class="group">Still Airing:   ${list.status}</p>
                    <p id="synopsis" class="group">Summary:</p>
                    <p id="sum" class="group">${list.synopsis}</p>
                </div>
                </div>`      
        });
        $hidden.html(randomEn)
    }
    randomData()
// }