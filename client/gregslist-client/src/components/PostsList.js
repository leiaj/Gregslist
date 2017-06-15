import React from 'react'

export default function PostsList(props){
  return(
    <div>{props.posts.map(post => <p key={post.id}>{post.title}</p>)}</div>
  )
}
