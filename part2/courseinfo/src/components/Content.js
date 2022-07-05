import React from 'react'

const Part = ({name, exercises}) => {
 
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Content = ({part}) => {
  return (
    <>
      <Part name={part.name} exercises={part.exercises}/>
    </>
  )
}

export default Content