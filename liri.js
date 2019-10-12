require("dotenv").config();




var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var movieName = "";
var songName = "The Sign";
var bandName = "";
var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=fcc60e39";
var bandURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";


var spot = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
console.log("user input:  ", userInput);

switch (action) {
    case "concert-this":
        //concert function here;
        artistSearch();
        break;

    case "spotify-this-song":
        //song search function here;
        songSearch();
        break;
    
    case "movie-this":
        //movie search here;
        movieSearch();
        break;
    case "do-what-it-says":
        
        break;
}

//function for concert-this that takes userInput and search the bands in town api

function artistSearch() {
    bandName = userInput;
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp&date=upcoming").then(
        function(response){
            console.log("band response: ", response.data[0].venue);
            response.data.forEach(e => console.log(e.venue))
        }
    )
}

//function for spotify-this-song that takes userInput and search spotify

//function for movie-this that takes userInput and search omdb




function movieSearch() {
    movieName = userInput.replace(/" "/g, '+');
    var response;
    axios.get("https://www.omdbapi.com/?t=" + movieName + "&apikey=fcc60e39").then(
        function(response){
        // console.log(response);
        console.log("Movie Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("\n----------------------------\n")
        }).catch(function(error){
            console.log(error);
        
        })
   
}