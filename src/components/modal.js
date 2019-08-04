import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.saveBtn = this.saveBtn.bind(this);
    }
    componentDidMount() {
        let today = new Date(),
            day = today.getDate(),
            month = today.getMonth()+1, //January is 0
            year = today.getFullYear();
        if(day<10){
            day='0'+day
        }
        if(month<10){
            month='0'+month
        }
        today = year+'-'+month+'-'+day;

        document.getElementById("dob").max = today;
    }
    saveBtn() {
        let actorName = document.getElementById('actorName').value;
        let sex = document.querySelector('input[name="sex"]:checked').value;
        let dob = document.getElementById('dob').value;
        let bio = document.getElementById('bio').value;
        let buildObjQuery = {};
        buildObjQuery['name'] = actorName;
        buildObjQuery['sex'] = sex;
        buildObjQuery['dob'] = dob;
        buildObjQuery['bio'] = bio;
        if(actorName.trim() == "") {
            alert("Please enter Actor name");
            document.getElementById('actorName').focus();
            return;
        }
        if(sex.trim() == "") {
            alert("Please check sex");
            document.getElementById('sex').focus();
            return;
        }
        if(dob.trim() == "") {
            alert("Please enter Date of Birth");
            document.getElementById('dob').focus();
            return;
        }
        if(bio.trim() == "") {
            alert("Please enter Bio");
            document.getElementById('bio').focus();
            return;
        }
        fetch("http://localhost/kishore/addActor.php", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(buildObjQuery),
        })
            .then((data) => { alert("Star added successfully. Click OK to proceed."); window.location.href = "/add-movie"; } )
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <div id="open-modal" className="modal-window">
                <div className="modal-content">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4>Add Actor</h4>
                        </div>
                        <div className="col-sm-2" align="right">
                            <a href="#">X</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="actorName" className="pull-left">Actor Name</label>
                                <input type="text" className="form-control pull-right" id="actorName" />
                            </div>
                            <div className="form-group" style={{marginBottom:'0'}}>
                                <label htmlFor="sex" className="pull-left" style={{paddingRight:'16%'}}>Sex</label>
                                <label className="radio-inline">
                                    <input type="radio" value="Male" name="sex" id="sex" checked />Male
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" value="Female" name="sex" />Female
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" value="Others" name="sex" />Others
                                </label>
                            </div>
                            <div className="form-group" style={{paddingTop:'15px'}}>
                                <label htmlFor="dob" className="pull-left">Date of Birth</label>
                                <input type="date" className="form-control pull-right" id="dob" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio" className="pull-left">Bio</label>
                                <textarea className="form-control pull-right" id="bio" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="buttons" align="right">
                                <a href="/add-movie" className="btn btn-danger">Cancel</a>
                                <button type="button" onClick={this.saveBtn} className="btn btn-success">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
