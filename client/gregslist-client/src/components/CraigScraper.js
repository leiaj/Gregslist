import React, { Component } from 'react'
const craigslist = require('node-craigslist');


const client = new craigslist.Client({
  city : 'NYC'
});

export default class CraigScraper extends Component {
  constructor(){
    super()
    this.state = {
      lists: ''
    }
    this.searchCraigsList = this.searchCraigsList.bind(this)
  }


  searchCraigsList() {
    client
      .search("drums")
      .then( (listings) => {
        listings.forEach( (listing) => {
          client.details(listing)
          .then( res => JSON.stringify(res))
          .then( (response) => this.setState( (prevState) => {
              return {
                  lists: [...prevState.lists, response]
                    }
                  }
                )
                )
          .then(console.log)
              }
            )
        }
      )
    }






  componentDidMount(){
    // this.searchCraigsList()
  }

  render(){
    return(
      <div>
      <p>{this.state.lists}</p>
      </div>
    )
  }
}
