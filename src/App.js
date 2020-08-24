import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow'
import DefaultRow from './DefaultRow'
import MostPopular from './MostPopular'

class App extends Component {
  _isMounted = false;
  genres = {}
  constructor(props) {
    super(props)
    this.state = {
      rows: null,
    }
    this.getGenres()
  }
  getGenres() {
    //console.log(genres)
    let query = 'https://api.themoviedb.org/3/genre/movie/list?api_key=f3f4d28e0e868813e48a9fd421a821aa&language=en-US'
    fetch(query)
      .then(res2 => res2.json())
      .then(res2 => {
        const moviesGenres = res2.genres;
        moviesGenres.forEach(value => {
          this.genres[value['id']] = value['name']
        });
      })
  }
  setSearchTerm(searchTerm) {
    var query = ""
    var mostPopular = false
    if (!searchTerm) {
      query = 'https://api.themoviedb.org/3/movie/popular?api_key=f3f4d28e0e868813e48a9fd421a821aa&language=en&page=1'
      mostPopular = true
    } else {
      const urlString = 'https://api.themoviedb.org/3/search/movie?api_key=f3f4d28e0e868813e48a9fd421a821aa' +
        '&language=en&query='
      query = urlString + searchTerm.replace(/\s/g, '+')
      mostPopular = false
    }
    fetch(query)
      .then(res => res.json())
      .then(res => {
        const movies = res.results;
        //console.log(movies.length)
        var movieRows = []
        var movieRow = null;
        if (movies.length === 0) {
          movieRow = <DefaultRow key="0" />
          movieRows.push(movieRow)
        } else {
          if (mostPopular) {
            movieRow = <MostPopular key="0" />
            movieRows.push(movieRow)
          }
          movies.forEach(movie => {
            let movieGenre=[]
            //console.log(movie.genre_ids)
            // this.getGenres(movie.genre_ids)
            // this.genres.forEach(genre=>{
             // console.log(this.genres[28])
            // })
            movie.genre_ids.forEach(value=>{
              // console.log(value)
              // console.log(this.genres[value])
              // console.log(value,movie.title)
              movieGenre.push(this.genres[value])
            })
            // console.log(movieGenre)
            movie.genres = movieGenre.join(',')
            if (movie.poster_path !== null) {
              movie.poster_src = 'https://image.tmdb.org/t/p/w780' + movie.poster_path
            } else {
              movie.poster_src = 'poster-not-found.jpg';
              // movie.poster_src = 'movie-poster-coming-soon.png'; //uncomment to alternate img
            }
            if (movie.overview === "") {
              movie.overview = React.createElement('strong', { className: 'text-warning' }, 'No overview available.')
              // movie.overview.textContent = 'No overview available.'
              // movie.overview.className("text-warning")
            }
            movieRow = <MovieRow key={movie.id} movie={movie} />
            movieRows.push(movieRow)
          })

        }
        if (mostPopular) {
          movieRows = movieRows.slice(0, 11)
        }
        this.setState({ rows: movieRows },)
      })
  }
  searchChangeHandler(event) {
    this.setSearchTerm(event.target.value)
  }
  componentDidMount() {
    this.setSearchTerm(false)
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="index.html">
            <img src="tmdb-logo.png" width="80" height="80" className="d-inline-block align-top mr-sm-2" alt="The Movie DB Logo" />
            <span className="display-4">
              MovieDB API
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <form className="my-2 my-lg-0">
              <input className="form-control form-control-lg mr-0"
                onChange={this.searchChangeHandler.bind(this)} type="search" placeholder="Enter search term" aria-label="Search" />
              {/* <button className="btn btn-outline-success btn-lg my-2 my-sm-0" type="submit">Search</button> */}
            </form>
          </div>
        </nav>
        <div className="container-fluid">
          {this.state.rows}

        </div>
      </div>
    );
  }
}

export default App;
