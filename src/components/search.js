import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <form className="navbar-form navbar-right">
                <div className="form-group">
                    <input type="text" placeholder="Search" className="form-control" />
                </div>
                <button type="submit" className="btn btn-success">Search</button>
            </form>
        );
    }
}
export default Search;