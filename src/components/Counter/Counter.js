import React, {Component} from 'react';
import { Button } from 'antd'

import store from '../../Store';
import * as actions from '../../Actions'

function Counter(props){
    const {caption, onIncrement, onDecrement, value} = props;
    return (
        <div>
            <Button onClick={onIncrement}>+</Button>
            <Button onClick={onDecrement}>-</Button>
            <span>{caption} : {value}</span>
        </div>
    )
}

class CounterContainer extends Component {
    constructor(props){
        super(props);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);
        this.state = this.getOwnState()
    }
    getOwnState(){
        return {
            value: store.getState()[this.props.caption]
        }
    }
    onChange(){
        this.setState(this.getOwnState())
    }
    onIncrement(){
        store.dispatch(actions.increment(this.props.caption))
    }
    onDecrement(){
        store.dispatch(actions.decrement(this.props.caption))
    }
    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.caption !== this.props.caption) || (nextState.value !== this.state.value)
    }
    componentDidMount(){
        store.subscribe(this.onChange)
    }
    componentWillUnmount(){
        store.unsubscribe(this.onChange)
    }
    render(){
        const { caption } = this.props;
        const { value } = this.state;
        return <Counter caption={caption} onIncrement={this.onIncrement} onDecrement={this.onDecrement} value={value}></Counter>
    }
}

export default CounterContainer