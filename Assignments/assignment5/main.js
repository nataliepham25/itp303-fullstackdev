const APIKEY = "9101c36f915c6d16625f385d079c28bf";
const searchEndPoint = "https://api.themoviedb.org/3/search/movie?api_key=" + APIKEY + "&query=";
const nowPlayingEndPoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + APIKEY;


const CallSearchAPI = (callBack, endpoint) => {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callBack(ajax.responseText);
        }
    }
    ajax.open("GET", endpoint);
    ajax.send();
}

const populate = (data) => {
    const movieData = JSON.parse(data);
    console.log(movieData);

    document.querySelector("#poster-holder").innerHTML = "";
    if (movieData.results.length == 0) {
        let newPoster = document.createElement("div");
        newPoster.innerHTML = "No Results";
        newPoster.style.color = "red";
        document.querySelector("#poster-holder").appendChild(newPoster);
    } else {
        document.querySelector("#search-text").innerHTML = `Showing ${movieData.results.length > 20 ? 20 : movieData.results.length} of ${movieData.total_results} results`;
        for (let i = 0; i < 20; i++) {
            let newPoster = document.createElement("div");
            newPoster.classList.add("poster");
            newPoster.classList.add("col-6");
            newPoster.classList.add("col-md-4");
            newPoster.classList.add("col-lg-3");
            document.querySelector("#poster-holder").appendChild(newPoster);
            let holderDiv = document.createElement("div");
            holderDiv.classList.add("img-holder");
            newPoster.appendChild(holderDiv);
            let newTextHolder = document.createElement("div");
            newTextHolder.classList.add("hidden");
            holderDiv.appendChild(newTextHolder);
            let newRating = document.createElement("div");
            newRating.innerHTML = "Rating: " + movieData.results[i].vote_average;
            newRating.classList.add("text");
            newTextHolder.appendChild(newRating);
            let newVotes = document.createElement("div");
            newVotes.innerHTML = "Number of votes: " + movieData.results[i].vote_count;
            newVotes.classList.add("text");
            newTextHolder.appendChild(newVotes);
            let newDesc = document.createElement("div");
            newDesc.innerHTML = movieData.results[i].overview.substr(0, 200);
            if (movieData.results[i].overview.length > 200) {
                newDesc.innerHTML += "...";
            }
            newDesc.classList.add("text");
            newTextHolder.appendChild(newDesc);
            let newImage = document.createElement("img");
            if (movieData.results[i].poster_path) {
                newImage.src = `https://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}`;
            } else {
                newImage.src = "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";
            }
            holderDiv.appendChild(newImage);
            let newTitle = document.createElement("div");
            newTitle.innerHTML = movieData.results[i].original_title;
            newPoster.appendChild(newTitle);
            let newDate = document.createElement("div");
            if (movieData.results[i].release_date) {
                newDate.innerHTML = (movieData.results[i].release_date);
            } else {
                newDate.innerHTML = "No Date Available";
            }
            newPoster.appendChild(newDate);
        }
    }

}

document.querySelector("#searchbar").onsubmit = (e) => {
    e.preventDefault();
    let query = document.querySelector("#searchValue").value;
    CallSearchAPI(populate, searchEndPoint + query);
}


CallSearchAPI(populate, nowPlayingEndPoint);