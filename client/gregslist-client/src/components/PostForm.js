import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

export default class PostForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: "",
      description: "",
      img_url: "",
      email: "",
      value: 0.0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const post = this.state
    this.props.createPost(post)
  }

  handleUpdate(e){
    e.preventDefault()
    let post = this.state
    post.id = this.props.post.id
    this.props.updatePost(post, this.props.routerProps)
  }

  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  componentDidMount(){
    if (!!this.props.post){
      this.setState({
        title: this.props.post.title,
        description: this.props.post.description,
        img_url: this.props.post.img_url,
        email: this.props.post.email,
        value: this.props.post.value
      })
    }
  }


  render(){
    return(
      <div>
      <Switch>
        <Route exact path='/posts/new' render={() => {
          return(
            <form onSubmit={this.handleSubmit}>
            <div className='form-style'>
            <p><h3>Create a New Post</h3></p>
            <p>
              <input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />

              <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}/>
            </p>
            <p>
              <input type="text" placeholder="Image URL" name="img_url" value={this.state.img_url} onChange={this.handleChange}/>

              <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
            </p>
            <p>
              $<input type="number" min="0.00" max="500.00" step="0.01" placeholder="Value" name="value" value={this.state.value} onChange={this.handleChange}/>
            </p>

              <input type="submit" id="submit-button"/>
              </div>
            </form>
          )
        }} />
        <Route exact path='/posts/:id/edit' render={() => {
          return(
            <form onSubmit={this.handleUpdate}>
              <input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
              <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}/>
              <p>
              <input type="text" placeholder="Image URL" name="img_url" value={this.state.img_url} onChange={this.handleChange}/>
              <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
              </p>
              <input type="number" min="0.00" max="500.00" step="0.0`" placeholder="Value" name="value" value={this.state.value} onChange={this.handleChange}/>
              <input type="submit"/>
            </form>
          )
        }}/>
          </Switch>
      </div>

    )
  }



}
