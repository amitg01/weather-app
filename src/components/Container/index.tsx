import Loading from '../common/Loading'
import './container.scss'

const Container = () => {
  return (
    <div className='container'>
      <Loading isLoading={true}>
        <p>This is the Container</p>
      </Loading>
    </div>
  )
}

export default Container
