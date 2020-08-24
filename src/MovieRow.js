import React from 'react';

class MovieRow extends React.Component {
    render() {
        return (<div className="row m-3 p-3 rounded" key={this.props.movie.id}>
            <div className="col-sm-4">
                <img src={this.props.movie.poster_src}
                    alt={this.props.movie.original_title} className="img-thumbnail" />
            </div>
            <div className="col-sm-8">
                <h1 className="display-5">{this.props.movie.title}</h1>
                <h5><strong className="text-info">Original title:</strong> {this.props.movie.original_title}</h5>
                <h6><strong className="text-success">Genres:</strong> {this.props.movie.genres}</h6>                
                <p>{this.props.movie.overview}</p>
            </div>
        </div>)
    }
}

export default MovieRow;