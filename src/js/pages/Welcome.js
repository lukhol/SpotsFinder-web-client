import React from "react";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let aligntJustifyStyle = {
            textAlign: "justify"
        };

        return(
            <div className="container" style={aligntJustifyStyle}>
                <h2 className="text-center">
                    Witaj na stronie aplikacji SpotsFinder
                    <hr/>
                </h2>
                <p>
                    <h4 className="center-block" style={{maxWidth: "400px", textAlign: "justify"}}>
                        Na stronie tej możesz poszukać miejsc do jazdy na deskorolce w Twojej okolicy, wyświetlić je na mapie oraz na liście.
                        Jeżeli znasz jakieś ciekawe miejsce, którego tutaj nie ma załóż konto i podziel się nim z innymi.
                        Zachęcamy również do ściągnięcia aplikacji mobilnej żebyś mógł dodawać nowe miejsca gdziekolwiek jesteś.
                    </h4>
                </p>
            </div>
        )
    }
}