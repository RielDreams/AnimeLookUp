////////////
//iife
///////////
// $(function(){ 

///////////////
//ELEMENTS
///////////////
    let limit = 500;
    const $body = $('body')
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
    const $dq = $('#DQueue')

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
    $(document).on('click', '#add', addToQue);
    $(document).on('click', '#remove', removeFromQue)

///////////////
//FUNCTIONS
///////////////

    ///////////////
    //search bar function
    ///////////////
    function getData(e){
        e.preventDefault();
        userinput = $input.val();
        $input.val('');
        $.ajax({url: url+userinput, headers}).then(
            (data) => {
                render(data.data)
                console.log(data)
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
                            <a href="#close-modal" rel="modal:close" class="buttons">
                                <input id="add" class="button" type="button" value="Add" />
                                <input id="remove" class="button" type="button" value="Remove" />
                            </a>
                        </div>
                    </div>`      
        });
        $section.html(showList)
    }

    ///////////////
    //Random Data Auto Loading
    ///////////////
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
                    <a href="#close-modal" rel="modal:close">
                        <input id="add" class="button" type="button" value="Add" />
                        <input id="remove" class="button" type="button" value="Remove" />
                    </a>
                </div>
                </div>`      
        });
        $hidden.html(randomEn)
    }
    randomData()

    function randomClick(e) {
        x = Math.floor(Math.random() * limit)
        $('#randomButton').attr(`href`,`#x${x}`);
    }
    
    ///////////////
    //Add/remove to Queue
    ///////////////

    function addToQue(e) {
        data = $(e.target).closest('div');
        id = data[0].getAttribute('id');
        d = data[0].children;
       $dq.append(`<div id="page" class="${id}">
                        <div id="poster" class="group">
                            <a href="#${id}" rel="modal:open">${d[0].outerHTML}</a>
                            <input id="remove" class="button" type="button" value="Remove" />
                        </div>
                    </div>`
                    );
        localStorage.setItem(id, d[0].outerHTML)
    }

    function removeFromQue(e) {
        data = $(e.target).closest('div');
        id = data[0].getAttribute('id');
        // vvv outter remove button vvvv
        d = data.closest(`#page`);
        d.remove()
        // vvv inner remove button 
        $(`.${id}`).remove()
        console.log(d[0].className)
        localStorage.removeItem(id)
        localStorage.removeItem(id[0].className)
    }

    for(let key in localStorage){
        if(localStorage.hasOwnProperty(key)){
            $dq.append(`<div id="page" class="${key}">
            <div id="poster" class="group">
                <a href="#${key}" rel="modal:open">${localStorage[key]}</a>
                <input id="remove" class="button" type="button" value="Remove" />
            </div>
            </div>`
        );
        console.log(`key ${key} . value ${localStorage[key]}`)
        }
    }

// }