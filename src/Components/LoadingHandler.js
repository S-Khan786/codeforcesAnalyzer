import React from 'react'
import {HashLoader} from "react-spinners";

const LoadingHandler = ({loading}) => {
  const color = "#EB3D4A";
  
  return (
    <div className='my-8'>
    <HashLoader color={color} loading={loading} size={50} />
    </div>
  )
}

export default LoadingHandler