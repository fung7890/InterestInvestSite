import React, { Component } from "react";
import Title from "./title";
import "../styles/landing.css";
import testjson from "../assets/TESTJSON.json";
import lemmatize from "wink-lemmatizer";
import axios from "axios";

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

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ tickers: [] });
    this.setState({ stockInfo: [] });

    for (let stock of Object.entries(testjson)) {
      const lemmatized_search = lemmatize.noun(this.state.value.toLowerCase());

      if (stock[1][lemmatized_search]) {
        // this.setState(
        //   state => ({
        //     tickers: [...state.tickers, stock[0]]
        //   }),
        //   this.returnStockInfo(stock[0])
        // );

        // const result = await axios.get(
        //   "https://financialmodelingprep.com/api/v3/company/profile/".concat(
        //     stock[0]
        //   )
        // );
        const result = await this.returnStockInfo(stock[0]);
        console.log("RESULT", result);
        // this.setState(state => ({
        //   stockInfo: [...state.stockInfo, result]
        // }));
      }
    }

    // event.preventDefault();
  }

  // updates view when you type
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

  // using axios get json object from api call
  returnStockInfo(ticker) {
    return axios
      .get(
        "https://financialmodelingprep.com/api/v3/company/profile/".concat(
          ticker
        )
      )
      .then(response => {
        // this.setState(state => ({
        //   stockInfo: [...state.stockInfo, response.data.profile]
        // }));
        return response.data.profile;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default Landing;

// NEED TO RANK STOCKS
