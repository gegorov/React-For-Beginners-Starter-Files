import React, { Component, Fragment } from 'react';

import { getFunName } from '../helpers';

export default class StorePicker extends Component {
  

  // constructor() {
  //   super();

  //   this.goToStore = this.goToStore.bind(this);

  // }

  myInput = React.createRef();


  goToStore = (event) => {
    event.preventDefault();
    console.log(this.myInput);
    console.log('Going to store');
  }



  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          ref={this.myInput}
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit" >Visit Store</button>
      </form>
    )
  }
}
