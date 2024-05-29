## Project description

This is a front web application that will provide users with access to information about Studio Ghibli movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies, based on its existing server-side code.

## Project dependencies

- React
- ReactDOM
- React-Router-Dom
- Bootstrap
- React-Bootstrap
- React-Bootstrap-Icons
- Prop-Types
- Moment
- Parcel/Transformer-Sass (v.2.10.2)
- Parcel (v.2.10.2)
- Process

## Link to app

Hosted on Netlify: https://studio-ghibli-client.netlify.app/

## Views

### Login View

- Allows users to log in with a username and password

### Signup View

- Allows new users to register (username, password, email, date of birth)

### Main View

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Ability to select a movie for more details
- Allows users to add/remove a movie to/from their list of favorites
- in Navbar:
  - Ability to log out
  - Ability to navigate to Profile View

### Single Movie View

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add/remove a movie to/from their list of favorites

### Profile View

- Displays user registration details
- Allows users to update their info (username, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies

  - Allows users to remove a movie from their list of favorites

  ## Set up this App

* Clone this repository
* Navigate to the movie_api-client folder and run `npm install`
* Run `parcel src/index.html`
