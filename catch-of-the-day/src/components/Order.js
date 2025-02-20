import React, { Component } from 'react';

import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'

export default class Order extends Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    deleteFromOrder: PropTypes.func,
  };

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    if (!fish) {
      return null;
    }

    const isAvailable = fish.status === 'available'
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: {
        enter: 500,
        exit: 500,
      }
    };

    if (!isAvailable) {
      return (
        <CSSTransition { ...transitionOptions }>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition { ...transitionOptions }>
        <li key={key}>
          <TransitionGroup component="span" className="count">
            <CSSTransition
              classNames="count"
              key={count}
              timeout={
                {
                  enter: 500,
                  exit: 500,
                }
              }
            >
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          <span>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <span>
              <button onClick={() => this.props.deleteFromOrder(key)}>&nbsp;&times;&nbsp;</button>
            </span>
          </span>
        </li>
      </CSSTransition>
    )
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return acc + count * fish.price;
      }

      return acc
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  };
}
