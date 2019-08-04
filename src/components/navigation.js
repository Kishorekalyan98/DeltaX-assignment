import React from 'react';
import { Link } from 'react-router-dom'
import Search from './search';
class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {      
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div id="navbar" className="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/add-movie">Add Movie</Link></li>
                            <li><a href="javascript:void(0)">Contact</a></li>
                        </ul>
                        <Search />
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
