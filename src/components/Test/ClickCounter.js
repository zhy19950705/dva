import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd'
import store from '../../Store';
import Actions from '../../Actions';
class Counter extends Component {

  constructor(props) {
    console.log('enter constructor: ' + props.caption);
    super(props);

    this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this);

    // this.state = {
    //   count: props.initValue
    // }
    this.state = this.getOwnState();
  }

  getOwnState() {
    console.log(store.getState(), this.props)
    return {
      value: store.getState()[this.props.caption]
    }
  }
  onChange() {
    this.setState(this.getOwnState())
  }
  /*
  getInitialState() {
    console.log('enter getInitialState');
  }
  getDefaultProps() {
    console.log('enter getDefaultProps');
  }
  */

  componentWillReceiveProps(nextProps) {
    console.log('enter componentWillReceiveProps ' + this.props.caption)
  }

  componentWillMount() {
    console.log('enter componentWillMount ' + this.props.caption);
  }

  componentDidMount() {
    // console.log('enter componentDidMount ' + this.props.caption);
    store.subscribe(this.onChange)

  }

  onClickIncrementButton() {
    // this.setState({count: this.state.count + 1});
    // this.updateCount(true);
    store.dispatch(Actions.increment(this.props.caption));
  }

  onClickDecrementButton() {
    // this.setState({count: this.state.count - 1});
    // this.updateCount(false)
    store.dispatch(Actions.decrement(this.props.caption))
  }
  
  updateCount(isIncrement) {
    const previousValue = this.state.count;
    const newValue = isIncrement ? previousValue +1 : previousValue-1;
    this.setState({count: newValue});
    this.props.onUpdate(newValue, previousValue);
  }

  /* 决定组件需不需要渲染，必须返回值 */
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) ||
           (nextState.count !== this.state.count);
  }

  render() {
    // console.log('enter render ' + this.props.caption);
    const { value } = this.state;
    const {caption} = this.props;
    return (
      <div>
        <Button  onClick={this.onClickIncrementButton}>+</Button>
        <Button onClick={this.onClickDecrementButton}>-</Button>
        <span>{caption} count: {value}</span>
      </div>
    );
  }
  componentWillUnmount() {
    state.unsubscribe(this.onChange)
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number,
  onUpdate: PropTypes.func
};

Counter.defaultProps = {
  initValue: 0,
  onUpdate: f => f
};

export default Counter;
