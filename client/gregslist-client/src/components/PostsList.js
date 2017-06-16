import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

export default function PostsList(props){
  return(
    <div>

          <div className='flex-row row'>
              <div className='row'>
                    {props.posts.map(post =>
                      <div id="f1_container">
                        <div id="f1_card" class="shadow">
                            <div className='col-sm-2 front face'><Link to={`/posts/${post.id}`}>
                              <img className='img' src={post.img_url}/></Link>
                            </div>
                            <div class="back face center">
                              <p>{post.title}</p>
                            </div>
                          </div>
                    </div>
                          )

                    }
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
