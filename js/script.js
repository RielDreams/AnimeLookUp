///////////////
//VARIABLES
///////////////
const url = "https://anime-db.p.rapidapi.com/anime?page=1&size=100&search=dragon%20ball%20z"
const headers = {
    'X-RapidAPI-Key': '80d0039c26mshef3d1e749d687d2p150054jsnfed47181c459',
    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }
///////////////
//ELEMENTS
///////////////

///////////////
//EVENT LISTENERS
///////////////

///////////////
//FUNCTIONS
///////////////

function getData(){
    $.ajax({url, headers}).then(
        (data) => {
            console.log(data)
        }, (error) => {
            console.log('this one is wrong', error)
        }
    )
}

getData()