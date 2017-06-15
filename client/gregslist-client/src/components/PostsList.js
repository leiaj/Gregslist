import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'

export default function PostsList(props){
  return(
    <div>
      {props.posts.map(post => <p key={post.id}>{post.title}</p>)}
      <Link to='/posts/new'>New Post</Link>
    </div>
  )
}
