import React, { Component } from 'react'
import PostsList from './PostsList'
import PostForm from './PostForm'
import PostView from './PostView'
import {Route, Link, Switch} from 'react-router-dom'


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
      <div className="container">
      <PostsList posts={this.state.posts} />
      <Switch>
        <Route exact path='/posts/new' render={() => <PostForm createPost={this.createPost} /> } />
        <Route exact path='/posts/:id' render={(routerProps) => {
          const id = routerProps.match.params.id
          const post = this.state.posts.find(p => p.id === parseInt(id))
          return <PostView post={post}/>
        }
       } />
      </Switch>
      </div>


    )
  }







}
