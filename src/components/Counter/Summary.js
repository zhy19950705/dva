import React, {Component} from 'react';
import store from '../../Store';

function Summary(props){
    return <div>Total Count: {props.sum}</div>
}

class SummaryContainer extends Component {
    constructor(props){
        super(props);
        this.state = this.getOwnState();
        this.onChange = this.onChange.bind(this);
    }
    getOwnState(){
        const state = store.getState();
        let sum = 0;
        for(const key in state){
            if(state.hasOwnProperty(key)){
                sum += state[key]
            }
        }
        return {sum}
    }
    onChange(){
        this.setState(this.getOwnState())
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState.sum !== this.state.sum
    }
    componentDidMount(){
        store.subscribe(this.onChange)
    }
    componentWillUnmount(){
        store.unsubscribe(this.onChange)
    }
    render(){
        const {sum} = this.state;
        return <Summary sum={sum}></Summary>
    }
}

export default SummaryContainer