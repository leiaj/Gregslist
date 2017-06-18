import React from 'react'
import { Link } from 'react-router-dom'

export default function PostsList(props){
  return(
    <div>
        <div className='flex-row row'>
            <div className='row'>
              {props.posts.map(post => <div key={post.id} className='col-sm-2'><Link to={`/posts/${post.id}`}><img className='img' src={post.img_url} alt={post.title}/></Link></div>)}
            </div>
        </div>

      <div className='row'>
        <div className='col-md-5'>
        </div>
          <div id="button-row" className='col-md-2'>
            <Link className="btn btn-primary" to='/posts/new'>New Post</Link>
          </div>
          <div className='col-md-5'>
        </div>
      </div>
    </div>
  )
}
