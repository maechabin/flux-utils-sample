import React, { PropTypes, Component } from "react";
import { render } from "react-dom";
import { Dispatcher } from "flux";
import { ReduceStore, Container } from 'flux/utils';

// Dispatcher
const dispatcher = new Dispatcher();

// Action
const testConstants = {
  TEST: "test"
};

const TestAction = {
  send(val) {
    dispatcher.dispatch({
      type: testConstants.TEST,
      value: val
    });
  }
};

// Store
class TestStore extends ReduceStore {

  getInitialState() {
    return {
      "value": null
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case testConstants.TEST:
        return {
          "value": action.value
        };
    };
  }

};

// Storeのインスタンス生成
const testStore = new TestStore(dispatcher);

// View (React Component)
class TestApp extends Component {
  static getStores() {
    return [testStore];
  }

  static calculateState(prevState) {
    return testStore.getState();
  }

  render() {
    console.log(this.state);
    return (
      <div className="testApp">
        <TestForm />
        <TestDisplay data={this.state.value} />
      </div>
    );
  }

}

const TestForm = React.createClass({
  _send(e) {
    e.preventDefault();
    let testValue = this.refs.myInput.value.trim();
    TestAction.send(testValue);
    this.refs.myInput.value = "";
    return;
  },
  render() {
    let message = this.props.data;
    return (
      <form>
        <input type="text" ref="myInput" defaultValue="" />
        <button onClick={this._send}>Send</button>
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

// Container
const TestAppContainer = Container.create(TestApp);


// ReactDom
render(
  <TestAppContainer />,
  document.getElementById("content")
);
