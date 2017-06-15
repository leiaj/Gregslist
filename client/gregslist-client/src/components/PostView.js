import React from 'react'

export default function PostView(props){
  if (!props.post){
    return null
  }
  return(
    <div>
      <h1>{props.post.title}</h1>
      <img src={props.post.img_url}/>
      <p>{props.post.description}</p>
      <p>{props.post.email}</p>
      <p>${props.post.value}</p>


    </div>
  )

}
