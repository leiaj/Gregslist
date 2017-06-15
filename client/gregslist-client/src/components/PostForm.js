import React, { Component } from 'react'

export default class PostForm extends Component {
  constructor(){
    super()

    this.state = {
      title: "",
      description: "",
      img_url: "",
      email: "",
      value: 0.0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const post = this.state
    this.props.createPost(post)
  }

  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
  }


  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
          <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}/>
          <input type="text" placeholder="Image URL" name="img_url" value={this.state.img_url} onChange={this.handleChange}/>
          <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
          <input type="text" placeholder="Value" name="value" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" />
        </form>
      </div>

    )
  }



}
