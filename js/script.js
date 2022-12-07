///////////////
//ELEMENTS
///////////////
    let limit = 500;
    let idx = 0
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
    const $hidden = $('#randompic');
    const $dq = $('#DQueue')
    const $quote = $('#quoteRoom')
    

///////////////
//VARIABLES
///////////////
//MAX SEARCH 25000
const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=${limit}&search=`
const headers = {
    'X-RapidAPI-Key': '80d0039c26mshef3d1e749d687d2p150054jsnfed47181c459',
    'X-RapidAPI-Host': 'anime-db.p.1'
    }


// const options = {
//         method: 'GET',
//         url: 'https://anime-quotes1.p.rapidapi.com/api/random',
//         headers: {
//           'X-RapidAPI-Key': '80d0039c26mshef3d1e749d687d2p150054jsnfed47181c459',
//           'X-RapidAPI-Host': 'anime-quotes1.p.rapidapi.com'
//         }
//       };

const url2 = 'https://animechan.vercel.app/api/quotes'
    
  
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
    function getAnimeQoute(){
        $.ajax(url2).then(
            (data) => {
                console.log(data)
                print(data)
            }, (error) => {console.log("this isnt working", error)
        })
    }

    function print(quote){
        const quotes = quote.map((q)=> {
            return `<div id="quotes" class="mySlides fade">
                <h1 id="qoute">${q.quote}</h1>
                <p id="character"> -${q.character}</p>
                </div>`
        });
            console.log(quotes)
            $quote.html(quotes)
    };
    

    getAnimeQoute()

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
                $('#quoteRoom').css("display", "none")
                $('#randompic').css("display", "none")
            }, (error) => {console.log("this isnt working", error)
        })
    };
    function render(shows) {
        const showList = shows.map((list) => {  
            return  `<div id="page">
                        <div id="poster" class="group">
                            <a href="#ex${list.ranking}" rel="modal:open">
                                <img id='movieImg' src="${list.image}"/>
                            </a>
                        </div>
                        <div id="ex${list.ranking}" class="modal">
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
        $.ajax({url: `https://anime-db.p.rapidapi.com/anime?page=1&size=1000&search=`, headers}).done(
            (data) => {
                randomDat(data.data)
            })
    }
    function randomDat(view){
            const randomEn = view.map((list) => {
                return  `<div id="page" class="slides .fade">
                <div id="poster" class="group">
                    <a href="#ex${list.ranking}" rel="modal:open">
                        <img id='movieImg' src="${list.image}"/>
                    </a>
                </div>
                <div id="ex${list.ranking}" class="modal">
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
        $hidden.html(randomEn)
    }
    

    function randomClick(e) {
        x = Math.floor(Math.random() * limit)
        $('#randomButton').attr(`href`,`#ex${x}`);
    }
    
    ///////////////
    //Add/remove to Queue && localStorage
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
        showHideQue();
        localStorage.setItem(id, d[0].outerHTML)
    }

    function removeFromQue(e) {
        data = $(e.target).closest('div');
        id = data[0].getAttribute('id')
        d = data.closest(`#page`);
        if(id === "poster") {
            function outerRemove() {
                d.remove();
                showHideQue()
                localStorage.removeItem(d[0].className)
            };
            outerRemove()
        }else {
            function innerRemove() {
            $(`.${id}`).remove();
            showHideQue()
            localStorage.removeItem(id)
            console.log(id)
            };
            innerRemove()
        };
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
        // console.log(`key ${key} . value ${localStorage[key]}`)
        }
    }

    ///////////////
    //Show/Hide Que if has Properties
    ///////////////
    function showHideQue(){
    if($dq[0].childElementCount !== 0){
        $('#queue').css("display", "grid")
        $('#quoteRoom').css("display", "none")
        $('#randompic').css("display", "none")
        // console.log('showingQue is wokring')
    }else {
        $('#queue').css("display", "none")
        $('#quoteRoom').css("display", "flex")
        $('#randompic').css("display", "flex")
    }
    }

    ///////////////
    //slideShow
    ///////////////

    function quoteSlides() {
        let i;
        let slides = $(".mySlides");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none"; 
        }
        idx++;
        if (idx > slides.length) {idx = 1} 
        slides[idx-1].style.display = "block";
        setTimeout(quoteSlides, 5000);
      }

    function pictureSlides() {
        let i;
        let slides = $(".slides");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none"; 
        }
        idx++;
        if (idx > slides.length) {idx = 1} 
        slides[idx-1].style.display = "block";
        setTimeout(pictureSlides, 5000);
      }


showHideQue();
randomData()
setTimeout((quoteSlides), 2000);
setTimeout((pictureSlides), 3000);