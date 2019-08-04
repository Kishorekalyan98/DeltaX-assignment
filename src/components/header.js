import React from 'react';
import Navigation from './navigation';
class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <Navigation />
                </div>
            </div>
        );
    }
}

export default Header;
