import React, { Component } from 'react';
import { render } from 'react-dom';
import { Dispatcher } from 'flux';
import { ReduceStore, Container } from 'flux/utils';

// Dispatcher
const dispatcher = new Dispatcher();

// Action
const act = {
  SEND: 'send'
};

const FormAction = {
  send(val) {
    dispatcher.dispatch({
      type: act.SEND,
      value: val
    });
  }
};

// Store
class FormStore extends ReduceStore {

  getInitialState() {
    return {
      'value': null
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case act.SEND:
        return {
          'value': action.value
        };
    }
  }

};

// Storeのインスタンス生成
const formStore = new FormStore(dispatcher);

// View (React Component)
class FormApp extends Component {
  static getStores() {
    return [formStore];
  }
  static calculateState(prevState) {
    return formStore.getState();
  }

  render() {
    console.log(this.state);
    return (
      <form>
        <FormInput />
        <FormDisplay data={this.state.value} />
      </form>
    );
  }

};

class FormInput extends Component {
  _send(e) {
    e.preventDefault();
    FormAction.send(this.refs.myInput.value.trim());
    this.refs.myInput.value = '';
    return;
  }
  render() {
    return (
      <div>
        <input type="text" ref="myInput" defaultValue="" />
        <button onClick={this._send.bind(this)}>Send</button>
      </div>
    );
  }
};

class FormDisplay extends Component {
  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
};

// Container
const FormAppContainer = Container.create(FormApp);

// ReactDom
render(
  <FormAppContainer />,
  document.getElementById('content')
);
