import React from 'react';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import './assests/css/style.css';
import Header from './components/header';
import Movies from './components/movies-list';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row content-area">
                    <div className="col-xs-12">
                        <h2 className="pull-left">Top 1O Movies 2019</h2>
                        <a href="/add-movie" class="btn btn-primary pull-right marginTop">+ Add Movie</a>
                        <Movies movies={[]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
