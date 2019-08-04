import React from 'react';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './assests/3party/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import './assests/css/style.css';
import Header from './components/header';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "image" : ""
        }
        this.saveBtn = this.saveBtn.bind(this);
    }
    saveBtn() {
        let movieName = document.getElementById('movieName').value;
        let yearRelease = document.getElementById('yearRelease').value;
        let plot = document.getElementById('plot').value;
        let poster = this.state.image;
        let cast = document.getElementById('cast');
        let castAsString = "";
        for (var i = 0; i < cast.options.length; i++) {
            if (cast.options[i].selected == true) {
                castAsString += cast.options[i].value;
            }
        }
        let buildObjQuery = {};
        console.log(document.getElementById('poster'));
        buildObjQuery['name'] = movieName;
        buildObjQuery['releaseYear'] = yearRelease;
        buildObjQuery['plot'] = plot;
        buildObjQuery['poster'] = poster;
        buildObjQuery['cast'] = castAsString;
        fetch("http://localhost/kishore/addMovie.php", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(buildObjQuery),
        })
            .then((data) => { alert("Success"); window.location.href = "/"; } )
            .catch((error) => console.log(error))
    }
    fileOnChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            //this.uploadedImage = e.target.result;
            this.setState({image : e.target.result});
        };
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
                            <input type="text" className="form-control pull-right" id="yearRelease" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="plot" className="pull-left">Plot</label>
                            <input type="text" className="form-control pull-right" id="plot" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="poster" className="pull-left">Poster</label>
                            <input type="file" onChange={(e) => this.fileOnChange(e)} className="form-control pull-right" id="poster" accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cast" className="pull-left">Cast</label>
                            <select multiple id="cast" name="cast[]" className="form-control pull-right">
                                <option value="one">One</option>
                                <option value="two">Two</option>
                                <option value="three">Three</option>
                                <option value="four">Four</option>
                                <option value="five">Five</option>
                            </select>
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