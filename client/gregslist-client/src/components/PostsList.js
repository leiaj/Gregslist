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
  }

  handleChange(e){
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.search(this.state.searchTerm)
  }


  render(){
    return(
      <div>
          <div className='flex-row row'>
              <div className='row'>
                {this.props.posts.map(post => <div key={post.id} className='col-sm-1'><Link to={`/posts/${post.id}`}><img className='img' src={post.img_url} alt={post.title}/></Link></div>)}
              </div>
          </div>

        <div className='row'>
          <div className='col-md-2'>
          </div>

          <div className='col-md-3'>
            <form onSubmit={this.handleSubmit}>
              <input type='text' placeholder="Search Gregslist!" onKeyUp={this.handleChange}/>
              <input className='btn btn-primary' type='submit' />
            </form>
          </div>

            <div id="button-row" className='col-md-2'>
              <Link className="btn btn-primary" to='/posts/new'>New Post</Link>
            </div>
            <div className='col-md-5'>
          </div>
        </div>
      </div>
    )
  }

}
