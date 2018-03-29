import React from "react";
import Header from '.././header/Header.js';
import Footer from './Footer.js';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
