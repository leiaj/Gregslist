import React, { Component } from 'react'
const craigslist = require('node-craigslist');
const responses = []



const client = new craigslist.Client({
  city : 'NYC'
});

export default class CraigScraper extends Component {
  constructor(){
    super()
    this.state = {
      lists: []
    }
    this.getLists = this.getLists.bind(this)
  }


  getLists() {
    client
      .search("drums")
      .then( (listings) => {
        listings.forEach( (listing) => {
          client.details(listing)
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

        // client
  //   .search("drums")
  //   .then((listings) => {
  //     listings.forEach( (listing) => (client.details(listing))
  //     .then((response) => this.setState((prevState) => {
  //       return
  //         lists: [...prevState, response]
  //     })
  //   )
  //   )}
  //   .catch((err) => {
  //     console.error(err);
  //   });




  componentDidMount(){
    this.getLists()
  }

  render(){
    return(
      <div>
      <p>{this.state.lists}</p>
      </div>
    )
  }
}
