import { useLocation } from 'react-router-dom'
import HeaderTwo from './Header/HeaderTwo'
import Header from './Header/Header'

function HomeNavbar() {
  const location = useLocation()
  return location.pathname === '/' ? <Header /> : <HeaderTwo />
}

export default HomeNavbar
