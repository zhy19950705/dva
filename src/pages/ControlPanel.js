import React, { Component } from 'react'
import Counter from '../components/Counter/Counter'
import Summary from '../components/Counter/Summary';

function ControlPanel(){
    return (
        <div>
            <Counter caption="First"></Counter>
            <Counter caption="Second"></Counter>
            <Counter caption="Third"></Counter>
            <Summary></Summary>
        </div>
    )
}

export default ControlPanel