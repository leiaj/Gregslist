import React, { Component } from 'react'
const craigslist = require('node-craigslist');

// let client = new craigslist.Client({
//   baseHost : 'craigslist.ca',
//   city : 'Toronto'
// });


export default class CraigScraper extends Component {
  constructor(){
    super()
    this.state = {
      lists: []
    }
    this.getLists = this.getLists.bind(this)
  }

  // getLists(){
  //   var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  //       targetUrl = 'https://toronto.craigslist.ca/search/sss?sort=rel&query=xbox%20one'
  //
  //   fetch(proxyUrl + targetUrl, {
  //     //  headers: {
  //     //    "content-type": "application/json",
  //     //    "accept": "application/json"
  //     //  },
  //   })
  //   .then(res => res.text())
  //   .then(res => JSON.stringify(res))
  //   .then(res => JSON.parse(res))
  //   .then(lists => this.setState({lists: lists}))
  // }

getLists(){
var craigslist = require("node-craigslist")

let client = new craigslist.Client({
  baseHost : 'craigslist.ca',
  city : 'Toronto'
});

debugger

client
  .list()
  .then((listings) => client.details(listings[0]))
  .then((details) => {
    console.log(details);
  })
  .catch((err) => {
    console.error(err);
  });
}

  // componentDidMount(){
  //   this.getLists()
  // }

  render(){
    return(
      <div>
      <p>{this.state.lists}</p>
      </div>
    )
  }
}
