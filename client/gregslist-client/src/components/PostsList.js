import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'

export default function PostsList(props){
  return(
    <div>
      {props.posts.map(post => <Link to={`/posts/${post.id}`}><img src={post.img_url}/></Link>)}
      <Link to='/posts/new'>New Post</Link>
    </div>
  )
}
