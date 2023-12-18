import React from 'react'

export const Button = ({text, type}) => {
  return (
    <>
    <div className='w-full pb-8'>
        <button type={type} className='w-full text-base font-semibold text-white bg-primary py-3 px-8 rounded-lg shadow-lg  hover:opacity-80 hover:shadow-lg transition'>{text}</button>
    </div>
    </>
  )
}
