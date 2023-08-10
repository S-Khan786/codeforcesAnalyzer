import React from 'react'

//TDL
//1. Username


const Attempts = ({tried, solved, avgAttempts, maxAttempts, singleAttemptAC, maxACs}) => {
  return (
    <div>
        <div className="w-full flex flex-col items-center">
                <div>
                    <div>
                        <p>Statistics about : {}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/2'>Tried</div>
                        <div className='w-1/2'>{tried}</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/2'>Solved</div>
                        <div className='w-1/2'>{solved}</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/2'>Average Attempts</div>
                        <div className='w-1/2'>{avgAttempts}</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/2'>Max Attempts</div>
                        <div className='w-1/2'>{maxAttempts}</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/2'>Solved in single submission</div>
                        <div className='w-1/2'>{singleAttemptAC}</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/2'>MaxAC(s)</div>
                        <div className='w-1/2'>{maxACs}</div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Attempts