const Notification = ({ message, status }) => {
    const style = (status) ? {color: 'green'} : {color: 'red'}

    if (message === null) {
      return null
    }
  
    return (
      <div className='message' style={style}>
        {message}
      </div>
    )
  }

  export default Notification