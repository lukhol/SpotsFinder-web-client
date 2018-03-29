import React from 'react';

export default class PlaceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: props.place
        };

        this.additionalCardStyle = {
            marginBottom: "30px",
            height: "100%",
            padding: "10px",
            backgroundColor: "#454545"
        };
    }

    render() {
        let imgSrc = 'data:image/jpg;base64, ' + this.state.place.mainPhoto;
        return(
            <div className="well sf-boarder-white sf-big-on-hover" style={this.additionalCardStyle}>
                <img className="img-responsive img-rounded center-block" src={imgSrc}/>
                <div className="text-center">
                    <h1>{this.state.place.name}</h1>
                    <h3>{this.state.place.description}</h3>
                </div>
            </div>
        )
    }
}