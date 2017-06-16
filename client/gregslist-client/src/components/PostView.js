import React from 'react'

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
              <img id="pic-show" src={props.post.img_url}/>
            </div>
            <div className="back face center">
              <h3>{props.post.email}</h3>
            </div>
          </div>
        </div>
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
