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
                            <li className="active"><Link to="/">Home</Link></li>
                            <li><a href="javascript:void(0)">TV Shows</a></li>
                            <li><a href="javascript:void(0)">Celebrities</a></li>
                            <li><a href="javascript:void(0)">Watch List</a></li>
                        </ul>
                        <Search />
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
