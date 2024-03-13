import { RotatingLines } from 'react-loader-spinner'

const Spinner = () => {
  return (
      <div className='spinner'>
          <RotatingLines color="black" height="100" width="120"/>
      </div>
  )
}

export default Spinner;