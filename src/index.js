//paginacion

let pageActual = 1;
const btnSiguiente = document.getElementById('btnSiguiente');
const btnAnterior = document.getElementById('btnAnterior');

btnSiguiente.addEventListener('click', ()=>{
    if(pageActual < 1001){
        pageActual += 1;
        getApiMovie();
    }
});

btnAnterior.addEventListener('click', ()=>{
    if(pageActual > 1){
        pageActual -= 1;
        getApiMovie()
    }
});


//con una funcion asincrona accedemos al api

const getApiMovie = async () => {

    try {
        let container_peliculas = '';
        const respuesta_api = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${pageActual}`);
        console.log(respuesta_api);
        if (respuesta_api.status === 200) {

            const data_movie = await respuesta_api.json();
            console.log(data_movie)
            data_movie.results.forEach(movie => {
                container_peliculas += `
                    <div class="peliculas">
                        <img class="imgMovie" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                        <h4 class="titulo">${movie.title}</h4>
                    </div>
                
                `;
            });

            document.getElementById('container').innerHTML = container_peliculas;
            
        } else if(respuesta_api.status === 401) {
            console.log('Error en el llamado a la api')
        } else if(respuesta_api.status === 404){
            console.log('El servicio de la pelicula solicitada, no se encuentra disponible')
        }else{
            console.log('Actualmente no encontramos el error presentado... regresa pronto')
        }
    } catch (e) {
        console.log(e);
    }



}

getApiMovie();