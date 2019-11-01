
# Project Title
liri-node-app
It is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

# Getting Started
clone the GitHub repository https://github.com/gouri10/liri-node-app to your computer using the below command
git clone git@github.com:gouri10/liri-node-app.git

# Prerequisites
##We use The Spotify API and it requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values 

##Create a file named `.env`, add the following to it, replace the values with your API key & secret (copied above) (no quotes required,directly paste them) 

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

# Installation
##Navigate to the root of our application and Run the below command to install all npm packages

npm install 


# Running the tests
node liri.js movie-this <movie name here>
![Sample-Movie-this-Output](/images/movie-this-output.png)

node liri.js spotify-this-song <song name here>
![Sample-Spotify-this-song-Output](/images/spotify-this-song-output.png)

node liri.js concert-this <artist/band name here>
![Sample-Concert-this-Output](/images/concert-this-output.png)

node liri.js do-what-it-says
![Sample-do-what-it-says-Output](/images/do-what-it-says-output.png)


# Built With
Node - The web framework
JQuery -Web Scripting

# Authors
Gouri peddinti :- Developer

# License
This project is licensed under the ISC License

# Acknowledgments
Hat tip to anyone whose code was used

