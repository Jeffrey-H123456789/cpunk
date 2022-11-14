const movieselect = document.getElementById("movie");
const button = document.getElementById("submit");
const moviecontainer = document.getElementById("moviecontainer")
const contentcon = document.getElementById("contentcon")
let movieID = 155;

function clearData(){
  while (moviecontainer.firstChild) {
    moviecontainer.removeChild(moviecontainer.firstChild);
  }
  while (contentcon.firstChild) {
    contentcon.removeChild(contentcon.firstChild);
  }
}

function getmovie(id){
  axios.get(`https:api.themoviedb.org/3/movie/${id}`, {
        params:{
        api_key: "dd0cae472f29b3a03f6bddb5090875f0",
        append_to_response: "videos",
        }
      }
    ).then((movieData) => {
      console.log(movieData);
      const img = document.createElement('img');
      const a = document.createElement('a');
      const p = document.createElement('p');
      const iframe = document.createElement('iframe');
      

      const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
      iframe.src = `https:www.youtube.com/embed/${trailers.at(0).key}`;
      img.src = `https:image.tmdb.org/t/p/w500${movieData.data.poster_path}`;
      a.innerHTML = `${movieData.data.title}`;
      p.innerHTML = `Release date: ${movieData.data.release_date} <br>
      Popularity: ${movieData.data.popularity} <br> 
      Status: ${movieData.data.status} <br> 
      Taglines: ${movieData.data.tagline} <br> 
      Overview of the movie: ${movieData.data.overview} <br>
      Movie id: ${movieData.data.id} <br> 
      Movie's Homepage Link: ${movieData.data.homepage} <br>`;
      
      
      moviecontainer.append(a);
      contentcon.append(p);
      
      moviecontainer.append(img);
      moviecontainer.append(iframe);
    }
)};

movieselect.addEventListener("click", () => {
  if(button.click){
    movieID = movieselect.value;
  }
})

button.addEventListener("click", () => {
  if(button.click){
    clearData();
    getmovie(movieID);
  }
})