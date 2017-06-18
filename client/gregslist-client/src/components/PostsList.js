import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PostsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.filterProps = this.filterProps.bind(this)
  }

  handleChange(e){
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('searching...')
    this.props.search(this.state.searchTerm)
  }

  filterProps(e){
    this.setState({
      searchTerm: e.target.value
    })
    // debugger
  }


  render(){
    return(
      <div>
          <div className='flex-row row'>
              <div id='post-list-gallery' className='row'>
                {this.props.posts.map(post => {
                  if (post.title.toLowerCase().includes(this.state.searchTerm)){
                    return(
                        <div key={post.id} className='col-sm-1'><Link to={`/posts/${post.id}`}><img className='img' src={post.img_url} alt={post.title}/></Link></div>
                      )
                    }
                  }
                )
                }

              </div>
          </div>

        <div className='row'>
          <div className='col-md-1'>
          </div>

          <div id="cl-search" className='col-md-4'>
            <form onSubmit={this.handleSubmit}>
              <input id="search-input" type='text' placeholder="Search Craigslist!" onKeyUp={this.handleChange}/>
              <input className='btn btn-primary' type='submit' />
            </form>
          </div>

            <div id="button-row" className='col-md-1'>
              <Link className="btn btn-primary" to='/posts/new'>New Post</Link>
            </div>

            <div className="col-md-1">
            </div>

            <div id="gl-search" className='col-md-4'>

              <input id='gregslist-input' type='text' placeholder="Search Gregslist!" onKeyUp={this.filterProps} />

          </div>
        </div>
      </div>
    )
  }

}
