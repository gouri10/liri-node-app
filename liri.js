require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

//Take the user input and store them in variables after separating
var task = process.argv[2];
var term = process.argv.slice(3).join(" ");

var performTask = function () {
    switch (task.toLowerCase()) {
        case "spotify-this-song":
            {
                get_SongInfo_With_Spotify();
                break;
            }
        case "concert-this":
            {
                get_ConcertInfo();
                break;
            }
        case "movie-this":
            {
                get_MovieInfo();
                break;
            }
        case "do-what-it-says":
            {
                do_What_It_Says();
                break;
            }
        default: {

            console.log("Please enter any of the below listed tasks:- \n movie-this  \nconcert-this  \nspotify-this-song  \ndo-what-it-says")
        }

    }//end of switch case

}//end of function performTask


//function to log data into the log.txt
var logData = function (commandInfo, outputInfo) {

    var commandSeparator = "\n---------------------------------------\n";
    var mainSeparator = "\n\n*******************************************************************************************************************************************************\n\n";

    fs.appendFile("log.txt", commandInfo + commandSeparator + outputInfo + mainSeparator, function (err) {
        if (err) throw err;
    });

}
//end of logData()

//function to perform movie-this task
var get_MovieInfo = function () {
    if (!term) {
        term = "Mr NoBody";
    }
    queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            var showMovieData = [
                "Title : " + response.data.Title,
                "Year : " + response.data.Year,
                "IMDB Rating : " + response.data.imdbRating,
                //"Rotten tomatoes Rating : "+response.data
                "Country : " + response.data.Country,
                "Language : " + response.data.Language,
                "Plot : " + response.data.Plot,
                "Actors : " + response.data.Actors
            ].join("\n");

            var command = "node liri.js " + task + " " + term;
            logData(command, showMovieData);
            console.log(showMovieData);


        })
        .catch(function (error) {
            // Something happened in setting up the request that triggered an Error
            console.log("Error From Movie This", error.message);
        }
        );
}
//end of get_MovieInfo()

//function to perform spotify-this-song task
var get_SongInfo_With_Spotify = function () {
    if (!term) {
        term = "The Sign";
    }
    spotify
        .search({ type: 'track', query: term, limit: 10 })
        .then(function (response) {
            //console.log(response.artists.items[0]);
            //console.log(response.tracks.items[0]);
            console.log("The Song's Name : " + term);
                console.log("Spotify Preview Link : " + response.tracks.items[0].album.external_urls.spotify);
                console.log("Album Name : " + response.tracks.items[0].album.name);
                console.log("Artist(s) : " + response.tracks.items[0].album.artists.map(e => e.name).join(","));
            // for (var j = 0; j < 10; j++) {
            //     console.log("The Song's Name : " + term);
            //     console.log("Spotify Preview Link : " + response.tracks.items[j].album.external_urls.spotify);
            //     console.log("Album Name : " + response.tracks.items[j].album.name);
            //     console.log("Artist(s) : " + response.tracks.items[j].album.artists.map(e => e.name).join(","));
            // }
        })
        .catch(function (err) {
            console.log(err);
        });


}
//end of get_SongInfo_With_Spotify()

//function to perform do what it says
var get_ConcertInfo = function () {
    if (!term) {
        term = "Celine Dion";
    }
    queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            var ArtistData = [];
            for (var i = 0; i < response.data.length; i++) {
                var data = "Venue : " + response.data[i].venue.name
                    + ", Location : " + response.data[i].venue.region + " " + response.data[i].venue.city + " " + response.data[i].venue.country
                    + ", DateTime : " + moment(moment(response.data[i].datetime)).format("MM/DD/YYYY");
                ArtistData.push(data);
            }

            var showArtistData = ArtistData.join("\n");
            var command = "node liri.js " + task + " " + term;
            logData(command, showArtistData);
            console.log(showArtistData);
        })
        .catch(function (error) {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        );
}
//end of get_ConcertInfo()

//function to perform do what it says
var do_What_It_Says = function () {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }            
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        console.log("Executing the Contents of random.txt .......... "+dataArr +"\n");
        task=dataArr[0];
        term=dataArr[1]; 
        performTask();     
      });
}
//end of do_What_It_Says()


performTask();
