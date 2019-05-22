import { EventEmitter } from "events";

const counterValues = {
    First: 1,
    Second: 10,
    Third: 20
}

const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCouterValues: () => {
        return counterValues
    },
    emitChange: () => {
        this.emit(CHANGE_EVENT)
    },
    addChangeListener: (callback) => {
        this.on(CHANGE_EVENT,callback)
    },
    removeChangeListener: (callback)=> {
        this.removeEventListener(CHANGE_EVENT, callback)
    }
})