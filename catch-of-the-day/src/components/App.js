import React, { Component } from 'react';
import PropTypes from "prop-types";

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

export default class App extends Component {

  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  };

  componentDidUpdate() {
    const storeId = this.props.match.params.storeId;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }


  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  deleteFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => (
                  <Fish
                    key={key}
                    index={key}
                    details={this.state.fishes[key]}
                    addToOrder={this.addToOrder}
                  />)
                )
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

