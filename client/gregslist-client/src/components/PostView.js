import React from 'react'
import { Link } from 'react-router-dom'

export default function PostView(props){
  if (!props.post){
    return null
  }
  return(
    <div id="pic-view" className='row'>
      <div className='col-md-5'>
        <div id="f1_container">
          <div id="f1_card" className="shadow">
            <div className="front face">
              <img id="pic-show" src={props.post.img_url} alt={props.post.title}/>
            </div>
            <div className="back face center">
              <Link className='btn btn-primary' to={`/posts/${props.post.id}/edit`} >Edit</Link>
              <button onClick={() => props.deletePost(props.post) } className="btn btn-success">Delete This Post</button>
            </div>
          </div>
        </div>
      </div>


      <div className='col-md-1'>
      </div>

      <div className='col-md-6'>
        <h1>{props.post.title}</h1>
        <p>{props.post.description}</p>
        <a href={props.post.email}><p>{props.post.email}</p></a>
        <p>${props.post.value}</p>
      </div>
    </div>
  )

}
