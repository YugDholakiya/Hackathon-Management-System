import Lottie from 'lottie-react';
import React from 'react'




function Animation({path,height,width}) {
  return (
    <div className=''>
      <Lottie animationData={path} loop={true} autoplay={true} style={{height, width}} />
    </div>
  )
}

export default Animation



