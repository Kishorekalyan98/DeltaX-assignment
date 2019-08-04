import React from 'react';
import Modal from './modal';
import MoviesRow from './moviesRow';
class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                "movies" : []
        }
    }  
    rows() {
        var lis = [];
        for (var i = 0; i < this.state.movies.length; i++) {
            lis.push(<MoviesRow key={i} data={this.state.movies[i]} />);
        }
        return lis;
    }
    componentDidMount() {
        fetch('http://localhost/kishore/getMovieList.php')
            .then(response => response.json())
            .then(data => { let list = {}; list.movies = data; console.log(list); this.setState(list) });
    }
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Poster</th>
                            <th scope="col">Movie Name</th>
                            <th scope="col">Year of Release</th>
                            <th scope="col">Plot</th>
                            <th scope="col">Cast</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rows()}
                    </tbody>
                </table>
                <Modal />
            </div>       
        );
    }
}

export default Movies;
