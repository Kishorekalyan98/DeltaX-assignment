import React from 'react';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import './assests/css/style.css';
import Header from './components/header';
import Modal from './components/modal';

class EditMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "image" : "",
            "actors" : [],
            "movie" : []
        };
        this.data = [];
        this.saveBtn = this.saveBtn.bind(this);
        this.onTodoChange = this.onTodoChange.bind(this);
        this.id = this.props.match.params.id;
    }
    saveBtn() {
        let movieName = document.getElementById('movieName').value;
        let yearRelease = document.getElementById('yearRelease').value;
        let plot = document.getElementById('plot').value;
        let posterForValidity = document.getElementById('poster').value;
        let hiddenPoster = document.getElementById('hiddenPoster').value;
        let poster = this.state.image;
        let cast = document.getElementById('cast');
        let castForValidity = document.getElementById('cast').value;
        let id = document.getElementById('id').value;
        let castAsString = "";
        for (var i = 0; i < cast.options.length; i++) {
            if (cast.options[i].selected == true) {
                castAsString += ", "+cast.options[i].value;
            }
        }
        let buildObjQuery = {};
        buildObjQuery['name'] = movieName;
        buildObjQuery['releaseYear'] = yearRelease;
        buildObjQuery['plot'] = plot;
        buildObjQuery['poster'] = poster == "" ? hiddenPoster : poster;
        buildObjQuery['cast'] = castAsString;
        buildObjQuery['id'] = id;
        if(movieName.trim() == "") {
            alert("Please enter Movie Name");
            document.getElementById('movieName').focus();
            return;
        }
        let yearRegex = new RegExp("^\\s*-?[0-9]{1,4}\\s*$");
        if(yearRelease.trim() == "") {
            alert("Please enter Movie Release year");
            document.getElementById('yearRelease').focus();
            return;
        } else if(!yearRegex.test(yearRelease.trim())) {
            alert("Please enter Valid Movie Release year ( only integers allowed )");
            document.getElementById('yearRelease').focus();
            return;
        }
        if(plot.trim() == "") {
            alert("Please enter Plot");
            document.getElementById('plot').focus();
            return;
        }
        if(posterForValidity == "" && hiddenPoster == "") {
            alert("Please Upload Poster");
            document.getElementById('poster').focus();
            return;
        }
        if(castForValidity == "") {
            alert("Please select cast");
            document.getElementById('cast').focus();
            return;
        }
        fetch('http://localhost/kishore/updateMovie.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify(buildObjQuery),
            },
        ).then(response => {
            alert("Movie updated successfully. Click OK to proceed.");
            window.location.href = "/";
        });
    }
    fileOnChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.setState({image : e.target.result});
        };
    }
    componentDidMount() {
        fetch('http://localhost/kishore/getActorsList.php')
            .then(response => response.json())
            .then(data => {
                this.setState({actors : data});
            });
        let buildObjQuery = {};
        buildObjQuery["id"] = this.id;
        fetch('http://localhost/kishore/getMovie.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
            body: JSON.stringify(buildObjQuery),
            },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let cast = [];
                    json.cast.split(',').map((option, key) => {
                        option != "" && cast.push(option.trim());
                    });
                    json.cast = cast;
                    this.setState({movie : json});
                });
            }
        });
    }
    onTodoChange(e, name){
        const {id, value} = e.target;
        let ids = this.state.movie;
        ids[name] = value;
        this.setState(ids);
    }
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row content-area">
                    <h3>Add New Movie</h3>
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label htmlFor="movieName" className="pull-left">Movie Name</label>
                            <input onChange={(e) => this.onTodoChange(e, "name")} type="text" value={this.state.movie.name} className="form-control pull-right" id="movieName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="yearRelease" className="pull-left">Year of Release</label>
                            <input onChange={(e) => this.onTodoChange(e, "releaseYear")} type="text" maxLength="4" value={this.state.movie.releaseYear} className="form-control pull-right" id="yearRelease" />
                        </div>
                        <div className="form-group margin-bottom-plot">
                            <label htmlFor="plot" className="pull-left">Plot</label>
                            <textarea onChange={(e) => this.onTodoChange(e, "plot")} className="form-control pull-right" id="plot" value={this.state.movie.plot} ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="poster" className="pull-left">Poster ( Recommended size 300x444px )</label>
                            <input type="file"  onChange={(e) => this.fileOnChange(e)} className="form-control pull-right" id="poster" accept="image/*" />
                            <input type="hidden" value={this.state.movie.poster} id="hiddenPoster" />
                            <input type="hidden" value={this.state.movie.id} id="id" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cast" className="pull-left">Cast <i>(Use shift key to select multiple actors)</i></label>
                            <select multiple onChange={(e) => this.onTodoChange(e, "cast")}  id="cast" name="cast[]" className="form-control pull-right">
                                { this.state.actors.map((option, key) => <option selected={(this.state.movie.cast !== undefined && this.state.movie.cast.indexOf(option.name) > -1)} key={key}>{option.name}</option>) }
                            </select>
                            <a href="#open-modal" className="btn btn-primary add-star">+ Add Star</a>
                            <Modal />
                        </div>
                        <div className="buttons">
                            <button type="button" onClick={this.saveBtn} className="btn btn-success">Save</button>
                            <a href="/" className="btn btn-danger">Cancel</a>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <img width="200" height="100" style={{marginLeft:'20%'}} className="img-thumbnail poster" src={this.state.movie.poster} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMovie;