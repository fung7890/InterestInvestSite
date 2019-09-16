import React, { Component } from "react";
import Title from "./title";
import "../styles/landing.css";
import testjson from "../assets/TESTJSON.json";
import lemmatize from "wink-lemmatizer";

class Landing extends Component {
  state = {
    count: 0,
    value: "",
    tickers: [],
    stockInfo: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnStockInfo = this.returnStockInfo.bind(this);
  }

  handleSubmit(event) {
    this.setState({ tickers: [] });
    this.setState({ stockInfo: [] });

    for (let stock of Object.entries(testjson)) {
      if (stock[1][lemmatize.noun(this.state.value.toLowerCase())]) {
        this.setState(state => {
          const tickers = state.tickers.concat(stock[0]);
          return {
            tickers
          };
        });
      }
    }

    for (let ticker of this.state.tickers) {
      console.log(ticker);
      this.returnStockInfo(ticker);
    }

    event.preventDefault();
  }

  // update stock ticker, this will then update view - CHANGE TO FUNCTION IN JSX ()=>
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <section className="section">
          <Title></Title>
          <br></br>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="search" />
          </form>
          <ul>
            {this.state.stockInfo.map(stockInfo => (
              <li key={stockInfo.companyName}>
                {stockInfo.price} {stockInfo.companyName}
              </li>
            ))}
          </ul>
        </section>
      </React.Fragment>
    );
  }

  returnStockJSX() {
    return <h1>RETURNJSXTEST</h1>;
  }

  returnStockInfo(ticker) {
    fetch(
      "https://financialmodelingprep.com/api/v3/company/profile/".concat(ticker)
    )
      .then(response => response.json())
      .then(data =>
        this.setState(state => {
          console.log(data.profile);
          const stockInfo = state.stockInfo.concat(data.profile);
          return {
            stockInfo
          };
        })
      );
  }
}

export default Landing;
