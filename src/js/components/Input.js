import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };

        this.internalOnInputChanged = this.internalOnInputChanged.bind(this);
    }

    internalOnInputChanged(event) {
        this.setState({
            val: event.target.value
        });
        this.props.onChange(event);
    }

    render() {
        return(
            <div className="form-group" style={{marginBottm: "0", marginTop: "15px"}}>
                {
                    this.props.label === undefined ? "" : (<label htmlFor="">{this.props.label}</label>)
                }
                <input type={this.props.type} 
                       class="form-control input-lg" 
                       placeholder={this.props.placeholder} 
                       value={this.state.val} 
                       onChange={this.internalOnInputChanged} 
                       id={this.props.id}
                       style={this.props.style}
                />
            </div>
        )
    }
}
//val - wartość
//onInputChanged - on change handler