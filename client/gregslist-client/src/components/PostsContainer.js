import React, { Component } from 'react'
import PostsList from './PostsList'
import PostForm from './PostForm'
import PostView from './PostView'
import CraigScraper from './CraigScraper'
import {Route, Switch} from 'react-router-dom'

const craigslist = require('node-craigslist');
const client = new craigslist.Client({
  city : 'NYC'
});



export default class PostsContainer extends Component {
  constructor(){
    super()
    this.state = {
      posts: [],
      clPosts: ''
    }
    this.fetchPosts = this.fetchPosts.bind(this)
    this.createPost = this.createPost.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.searchCraigsList = this.searchCraigsList.bind(this)

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

    updatePost(post, routerProps){
      fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          post: post
        })
      })
      .then(res => res.json())
      .then( (resPost) => {
        this.setState( (prevState) =>{
          return (
            {  posts: prevState.posts.map( p => {
                  if (p.id !== resPost.id){
                    return p
                  } else {
                    return resPost
                  }
                }
              )
            }
          )
        }
      )
    }
  )

    .then(() => routerProps.history.push(`/posts/${post.id}`))
    }

    deletePost(post){
      fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          post: post
        })
      })
      .then(res => res.json())
      .then(deadPost => this.setState(function(previousState){
      return {
        posts: previousState.posts.filter(function(post){
          return post.id !== deadPost.id
        })
      }
    }))
    }

    searchCraigsList(searchTerm) {
      client
        .search(searchTerm)
        .then( (listings) => {
          listings.forEach( (listing) => {
            client.details(listing)
            .then( res => JSON.stringify(res))
            .then( (response) => this.setState( (prevState) => {
                return {
                    clPosts: [...prevState.clPosts, response]
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
    this.fetchPosts()
  }

  render(){
    return(
      <div className="container">
      <PostsList posts={this.state.posts} search={this.searchCraigsList} />
      <Switch>
        <Route exact path='/posts/new' render={() => <PostForm createPost={this.createPost} /> } />
        <Route exact path='/posts/:id/edit' render={(routerProps) => {
          const id = routerProps.match.params.id
          const post = this.state.posts.find(p => p.id === parseInt(id, 10))
          if (!post){
            return null
          } else {
            return (<div>
                      <PostForm updatePost={this.updatePost} routerProps={routerProps} post={post} />
                      <PostView post={post}/>
                    </div>
            )
          }

          }
        }/>
        <Route exact path='/posts/:id' render={(routerProps) => {
          const id = routerProps.match.params.id
          const post = this.state.posts.find(p => p.id === parseInt(id, 10))
          return <PostView post={post} deletePost={this.deletePost} />
        }
       } />
      </Switch>
      <CraigScraper />
      </div>


    )
  }







}
