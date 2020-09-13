import React, { Component } from 'react';
import './css/App.css';
import logoSrc from './img/tmdb-logo.png';
import noPoster from './img/poster-not-found.jpg';
import MovieRow from './components/MovieRow'
import DefaultRow from './components/DefaultRow'
import MostPopular from './components/MostPopular'
import Footer from './components/footer';

class App extends Component {
  _isMounted = false;
  genres = {}
  constructor(props) {
    super(props)
    this.state = {
      rows: null,
    }
  }
  getGenres() {
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
  getMovies = (mostPopular, query) => {
    fetch(query)
      .then(res => res.json())
      .then(res => {
        const movies = res.results;
        // console.log(movies)
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
            let movieGenre = []
            if (movie.genre_ids.length > 0) {
              movie.genre_ids.forEach(value => {
                movieGenre.push(this.genres[value])
              })
            } else {
              movieGenre.push('No genres availables')
            }
            movie.genres = movieGenre.join(',')
            if (movie.poster_path) {
              movie.poster_src = 'https://image.tmdb.org/t/p/w780' + movie.poster_path
            } else {
              movie.poster_src = noPoster.toString();
            }
            if (!movie.overview) {
              movie.overview = React.createElement('strong', { className: 'text-warning' }, 'No overview available.')
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

    this.getMovies(mostPopular, query)
  }
  searchChangeHandler(event) {
    this.setSearchTerm(event.target.value)
  }
  componentDidMount() {
    this.getGenres()
    this.setSearchTerm(false)
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="index.html">
            <img src={logoSrc} width="80" height="80" className="d-block d-sm-inline-block align-top m-auto mr-sm-3" alt="The Movie DB Logo" />
            <span className="display-4">
              MovieDB API
            </span>
          </a>
          <button className="navbar-toggler m-auto mr-sm-0" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <form className="my-2 my-lg-0 mx-lg-3">
              <input className="form-control form-control-lg mr-0"
                onChange={this.searchChangeHandler.bind(this)} type="search" placeholder="Enter search term" aria-label="Search" />
            </form>
          </div>
        </nav>
        <div className="container-fluid">
          {this.state.rows}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
