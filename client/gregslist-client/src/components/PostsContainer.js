import React, { Component } from 'react'
import PostsList from './PostsList'
import PostForm from './PostForm'

export default class PostsContainer extends Component {
  constructor(){
    super()
    this.state = {
      posts: []
    }
    this.fetchPosts = this.fetchPosts.bind(this)
    this.createPost = this.createPost.bind(this)
  }

  fetchPosts(){
    fetch('http://localhost:3000/api/v1/posts')
    .then(res => res.json())
    .then(posts => this.setState({posts: posts}))
  }

    createPost(post){
      fetch('http://localhost:3000/api/v1/posts', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          post: post
        })
      })
      .then(res => res.json())
      .then(post => this.setState((prevState) => {
        return {
          posts: [...prevState.posts, post]
        }
      }))
    }

  componentDidMount(){
    this.fetchPosts()
  }

  render(){
    return(
      <div>
      <PostsList posts={this.state.posts} />
      <PostForm createPost={this.createPost} />
      </div>


    )
  }







}
