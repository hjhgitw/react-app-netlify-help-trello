import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

import GetMailData from "./api.js"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, loadingMail: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    if (e.target.name=="GetMail"){
      this.setState({ loadingMail: true})
      console.log("Get Mail clicked")
      
      GetMailData().then(data => {
        let { temp } = data;
        console.log(data);
      }).then.setState({ loadingMail: false, msg: "Done"})
    }
/*
    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
      */
  }

  render() {
    const { loadingMail,loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")} name="GetMail">{loadingMail ? "Loading..." : "Get MailBox"}</button>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
