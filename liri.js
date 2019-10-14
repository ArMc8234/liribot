require("dotenv").config();




var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var movieName = "";
var songName = "album:the%20sign%30artist:ace%20of%20base";
var bandName = "";
var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=fcc60e39";
var bandURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";


var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
console.log("user input:  ", userInput);
console.log("\n-------------------------------------\n");

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
            // console.log("band response: ", response.data[0].venue);
            response.data.forEach(e=> reformatedDateTime = moment(e.datetime,'YYYY MM DD HH:mm:s').format('MMMM Do YYYY, h:mm, a'))
            response.data.forEach(e => console.log("Venue Name:", e.venue.name, "  City:", e.venue.city, "  Region:", e.venue.region, "  Date:",  reformatedDateTime = moment(e.datetime,'YYYY MM DD HH:mm:s').format('MMMM Do YYYY, h:mm, a')))
        }
    ).catch(function(error){
        console.log(error);
    })
}

//function for spotify-this-song that takes userInput and search spotify

function songSearch() {
    songName = userInput;
    spotify
    .search({ type: 'track', query: songName })
    .then(function(response) {
    //   console.log(JSON.stringify(response, null, 1));
        response.tracks.items.forEach(e => console.log("Artist: ", e.album.artists[0].name, "  Song Name: ", e.name, "  Album: ", e.album.name, "  Preview Url: ", e.preview_url ))
    //     console.log("Artist: ", response.tracks.items[19].album.artists[0].name);
    //     console.log("Song Name: ", response.tracks.items[19].name);
    //     console.log("Album: ", response.tracks.items[19].album.name);
    //     console.log("Preview Url: ", response.tracks.items[19].preview_url);
    //     console.log("\n-------------------------------------\n");
    })
    .catch(function(err) {
      console.log(err);
    });
}
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
