import React from 'react';

export default class AddPlace extends React.Component {
    constructor(props) {
        super(props);

        this.onImageChange = this.onImageChange.bind(this);
        this.state = {
            images: []
        };

        this.marginStyle = {
            margin: "15px"
        };
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            if(this.state.images.length >= 5) {
                alert("Możesz dodać maksymalnie 5 plików.");
                return false;
            }

            let reader = new FileReader();
            let newImagesArray = this.state.images.slice();

            reader.onload = (e) => {
                newImagesArray.push(
                    <img src={e.target.result} width="250px" height="250px" style={this.marginStyle}/>
                );

                this.setState({images: newImagesArray});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    render() {
        return(
            <div className="container">
                <input type="file" name="placeImageInput" accept="image/*" onChange={this.onImageChange} />
                {this.state.images}
                <div>
                    <input type="text" name="placeName" placeholder="Nazwa"/>
                    <input type="text" name="description" placeholder="Opis"/>
                </div>
            </div>
        )
    }
}