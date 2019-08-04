import React from 'react';
class MoviesRow extends React.Component {
    constructor(props) {
        super(props);
        this.rowData = this.props.data;
        this.posterPath = "/posters/";
    }
    render() {
        return (
            <tr>
                <th scope="row"><img width="200" height="100" src={this.rowData.poster} className="img-thumbnail" alt={this.rowData.name} /> </th>
                <td>{this.rowData.name}</td>
                <td>{this.rowData.releaseYear}</td>
                <td>{this.rowData.plot}</td>
                <td>{this.rowData.cast}</td>
                <td><a className="btn" href="javascript:void(0);">Edit</a></td>
            </tr>
        );
    }
}

export default MoviesRow;
