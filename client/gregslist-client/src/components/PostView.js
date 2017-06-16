import React from 'react'

export default function PostView(props){
  if (!props.post){
    return null
  }
  return(
    <div id="pic-view" className='row'>
      <div className='col-md-5'>
        <img id="pic-show" src={props.post.img_url}/>
      </div>
      <div className='col-md-1'>
      </div>

      <div className='col-md-6'>
        <h1>{props.post.title}</h1>
        <p>{props.post.description}</p>
        <p>{props.post.email}</p>
        <p>${props.post.value}</p>
      </div>
    </div>
  )

}
