import { Outlet } from 'react-router-dom'
import '../../styles/Login/register.scss'
import '../../styles/Login/login.scss'

function LoginLayout() {
  return (
    <>
      <div className="container ">
        <Outlet />
      </div>
    </>
  )
}

export default LoginLayout
