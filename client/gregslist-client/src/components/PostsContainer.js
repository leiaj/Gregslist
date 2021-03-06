import React, { Component } from 'react'
import PostsList from './PostsList'
import PostForm from './PostForm'
import PostView from './PostView'
import {Route, Switch, Link} from 'react-router-dom'

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
    this.clPostsToPosts = this.clPostsToPosts.bind(this)

  }

  fetchPosts(){
    fetch('http://localhost:3000/api/v1/posts')
    .then(res => res.json())
    .then(posts => this.setState({posts: posts}))
  }

    createPost(post){
      if (!this.state.posts.includes(post)){
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
    }

    updatePost(post, routerProps){
      fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "Access-Control-Allow-Origin": 'http://localhost:3000/, http://localhost:3001/',
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
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
      //synchronicity + duplicity issues in dis here request
      client
        .search(searchTerm)
        .then( (listings) => {
          listings.forEach( (listing) => {
            client.details(listing)
            .then( res => JSON.stringify(res))
            .then( (response) => this.setState( (prevState) => {
              // debugger
                return {
                    clPosts: [...prevState.clPosts, response]
                      }
                    }
                  )
                )
            .then(() => this.clPostsToPosts() )
            // .then((newPost) => this.createPost(newPost) )
            .then(console.log)
            }
          )
        }
      )
      .catch(() => prompt("Please copy the following link and install the Allow-Control-Origin Chrome Extension", "https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en"))
    }

    clPostsToPosts(){
        let titleCheck = this.state.posts.map( post => post.title)
        let newPost = this.state.clPosts[this.state.clPosts.length - 1]
        newPost =  JSON.parse(newPost)

        newPost = {title: newPost.title,
           description: newPost.description.slice("40"),
           img_url: newPost.images === null ? "https://www.123freevectors.com/wp-content/uploads/new/icon/075-smiley-face-vector-art-free-download-l.png" : newPost.images[0] ,
           email: newPost.url,
           value: 25
         }
        if (!titleCheck.includes(newPost.title)){
          this.createPost(newPost)
        }
    }


  componentDidMount(){
    this.fetchPosts()
  }


  render(){
    return(
      <div className="container">
        <div className="row">
            <div className="col-lg-3">
              <Link id="main-head" to={'/posts'}><h1 className="animated fadeInLeftBig">Gregslist</h1></Link>
            </div>
            <div className="col-lg-1">
            </div>

            <div id="sub-title" className="col-lg-8">
              <p id="sub-title">A Modern Wrapper for a <a href="https://www.craigslist.com"> Classic Site </a> </p>
            </div>

        </div>
      <PostsList posts={this.state.posts} search={this.searchCraigsList} makePosts={this.clPostsToPosts} />
      <Switch>
        <Route exact path='/posts/new' render={() => <PostForm createPost={this.createPost} /> } />
        <Route exact path='/posts/:id/edit' render={(routerProps) => {
          const id = routerProps.match.params.id
          const post = this.state.posts.find(p => p.id === parseInt(id, 10))
          if (!post){
            return null
          } else {
            return (<div><p>
                      <PostForm updatePost={this.updatePost} routerProps={routerProps} post={post} /></p>
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

      </div>


    )
  }

}
