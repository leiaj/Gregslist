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

// Work on rendering the range value as you move the slider, here is ex. code let's customize it:
//<html>
// <body>
// <input type="range" min="0" max="50" value="0" step="5" onchange="showValue(this.value)" />
// <span id="range">0</span>
// <script type="text/javascript">
// function showValue(newValue)
// {
// 	document.getElementById("range").innerHTML=newValue;
// }
// </script>
// </body>
// </html>

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <p><input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} /></p>

          <p><input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}/></p>
          <p><input type="text" placeholder="Image URL" name="img_url" value={this.state.img_url} onChange={this.handleChange}/></p>
          <p><input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/></p>
          <p>0<input type="range" min="0" max="500" placeholder="Value" name="value" data-show-value="true" value={this.state.value} onChange={this.handleChange}/>100</p>
          <p><input type="submit" /></p>
        </form>
      </div>

    )
  }



}
