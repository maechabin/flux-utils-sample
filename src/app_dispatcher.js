import React, { Component } from 'react';
import { render } from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';
import assign from 'object-assign';

// Dispatcher
const dispatcher = new Dispatcher();

// Action
const CHANGE_EVENT = 'change';
const keys = {
  SEND: 'send'
};
const FormAction = {
  send(val) {
    dispatcher.dispatch({
      type: keys.SEND,
      value: val
    });
  }
};

// Store
var stateData = {value: null};

const FormStore = assign({}, EventEmitter.prototype, {
  getAll() {
    return stateData;
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  dispatcherIndex: dispatcher.register((action) => {
    switch (action.type) {
      case: keys.SEND:
        stateData.value = action.value;
        FormStore.emitChange();
    }
  });
});

// View (React Component)
const FormApp = React.createClass({
  getInitialState() {
    return FormStore.getAll();
  },
  componentDidMount() {
    FormStore.addChangeListener(() => {
      this.setState(FormStore.getAll());
    });
  },
  render() {
    return (
      <div className="formApp">
        <FormInput />
        <FormDisplay data={this.state.value} />
      </div>
    );
  }
});

const FormInput = React.createClass({
  _send(e) {
    e.preventDefault();
    FormAction.send(this.refs.myInput.value.trim());
    this.refs.myInput.value = '';
    return;
  },
  render() {
    return (
      <form>
        <input type="text" ref="myInput" defaultValue="" />
        <button onClick={this._send}>Send</button>
      </form>
    );
  }
});

const FormDisplay = React.createClass({
  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
});

// ReactDom
render(
  <FormApp />,
  document.getElementById('content')
);
