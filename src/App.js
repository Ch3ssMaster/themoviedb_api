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
            if (movie.poster_path !== null) {
              movie.poster_src = 'https://image.tmdb.org/t/p/w780' + movie.poster_path
            } else {
              movie.poster_src = 'poster-not-found.jpg';
            }
            if (movie.overview === "") {
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
            <img src="tmdb-logo.png" width="80" height="80" className="d-block d-sm-inline-block align-top m-auto mr-sm-3" alt="The Movie DB Logo" />
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
        {/* Footer */}
        <footer className="pt-4 m-5 pt-md-5 border-top">
          <div className="row justify-content-md-center text-center">
            <div className="col-sm text-success mb-3">
              <h5>
                Antonio Cebrián
          <small className="mb-3" id="date"> © </small>
          2020
              </h5>
              <h6 className="text-primary">TheMovieDB API <br />
                <span className="text-dark">v1.0.0-alpha</span>
              </h6>
            </div>
            <div className="col-sm-auto mb-3">
              <h5>My personal Website</h5>
              <div className="hover-container my-3">
                <a className="cig" href="http://clasesinformaticagranada.es/">
                  <span>Clases Informática Granada</span>
                </a>
              </div>
            </div>
            <div className="col-sm mb-3">
              <h5>Follow my work</h5>
              <ul className="list-group list-group-horizontal-lg">
                <li className="list-group-item flex-fill">
                  <a className="btn-floating btn-lg btn-li" type="button" role="button"
                    href="https://www.linkedin.com/in/antonio-cebrián-mesa">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="list-group-item flex-fill">
                  <a className="btn-floating btn-lg btn-git" type="button" role="button" href="https://github.com/Ch3ssMaster">
                    <i className="fab fa-github"></i>
                  </a>
                </li>
                <li className="list-group-item flex-fill">
                  <a className="btn-floating btn-lg btn-tw" type="button" role="button"
                    href="https://twitter.com/hacking_the_web">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
