import React, { PropTypes, Component } from "react";
import { render } from "react-dom";
import { Dispatcher } from "flux";
import { EventEmitter } from "events";
import assign from "object-assign";
import { ReduceStore, Container } from 'flux/utils';

const testDispatcher = new Dispatcher();

const CHANGE_EVENT = "change";
const testConstants = {
  TEST: "test"
};

// action
const TestAction = {
  test(testValue) {
    testDispatcher.dispatch({
      actionType: testConstants.TEST,
      value: testValue
    });
  }
};

// store
var _test = {value: null};

const TestStore = assign({}, EventEmitter.prototype, {
  getAll() {
    return _test;
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  dispatcherIndex: testDispatcher.register((payload) => {
    if (payload.actionType === testConstants.TEST) {
      // console.log(payload.value);
      _test.value = payload.value;
      TestStore.emitChange();
    }
  })
});

// view
const TestApp = React.createClass({
  getInitialState() {
    return TestStore.getAll();
  },
  componentDidMount() {
    TestStore.addChangeListener(() => {
      this.setState(TestStore.getAll());
    });
  },
  render() {
    return (
      <div className="testApp">
        <TestForm />
        <TestDisplay data={this.state.value} />
      </div>
    );
  }
});

const TestForm = React.createClass({
  send(e) {
    e.preventDefault();
    let testValue = React.findDOMNode(this.refs.test_value).value.trim();
    TestAction.test(testValue);
    React.findDOMNode(this.refs.test_value).value = "";
    return;
  },
  render() {
    return (
      <form>
        <input type="text" ref="test_value" />
        <button onClick={this.send}>Send</button>
      </form>
    );
  }
});

const TestDisplay = React.createClass({
  render() {
    let message = this.props.data;
    return (
      <div>{message}</div>
    );
  }
});

render(
  <TestApp />,
  document.getElementById("content")
);
