import React from 'react';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import './assests/css/style.css';
import Header from './components/header';
import Modal from './components/modal';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "image" : "",
            "actors" : []
        }
        this.saveBtn = this.saveBtn.bind(this);
    }
    saveBtn() {
        let movieName = document.getElementById('movieName').value;
        let yearRelease = document.getElementById('yearRelease').value;
        let plot = document.getElementById('plot').value;
        let posterForValidity = document.getElementById('poster').value;
        let poster = this.state.image;
        let cast = document.getElementById('cast');
        let castForValidity = document.getElementById('cast').value;
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
        buildObjQuery['poster'] = poster;
        buildObjQuery['cast'] = castAsString;
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
        if(posterForValidity == "") {
            alert("Please Upload Poster");
            document.getElementById('poster').focus();
            return;
        }
        if(castForValidity == "") {
            alert("Please select cast");
            document.getElementById('cast').focus();
            return;
        }
        fetch("http://localhost/kishore/addMovie.php", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(buildObjQuery),
        })
            .then((data) => { alert("New Movie added successfully. Click OK to proceed."); window.location.href = "/"; } )
            .catch((error) => console.log(error))
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
    }
    actorOptions(options) {
        var arr = [];
        for (var i = 0; i < options.length; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }
        return arr;
    }
    decode(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
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
                            <input type="text" className="form-control pull-right" id="movieName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="yearRelease" className="pull-left">Year of Release</label>
                            <input type="text" maxLength="4" className="form-control pull-right" id="yearRelease" />
                        </div>
                        <div className="form-group margin-bottom-plot">
                            <label htmlFor="plot" className="pull-left">Plot</label>
                            <textarea className="form-control pull-right" id="plot" ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="poster" className="pull-left">Poster ( Recommended size 300x444px )</label>
                            <input type="file" onChange={(e) => this.fileOnChange(e)} className="form-control pull-right" id="poster" accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cast" className="pull-left">Cast <i>(Use shift key to select multiple actors)</i></label>
                            <select multiple id="cast" name="cast[]" className="form-control pull-right">
                                { this.state.actors.map((option, key) => <option key={key} >{option.name}</option>) }
                            </select>
                            <a href="#open-modal" className="btn btn-primary add-star">+ Add Star</a>
                            <Modal />
                        </div>
                        <div className="buttons">
                            <button type="button" onClick={this.saveBtn} className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMovie;