import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import '../../styles/User/sidebar.scss'
import { useAuth } from '../../hooks/useAuth'

function UserLayout() {
  const { auth } = useAuth()
  return (
    <>
      <section className="user_banner">
        <div className="container">
          <div className="user_content row">
            {/* 導覽列 */}
            {/* <Sidebar /> */}
            {/* 判斷登入狀態 */}
            {auth.isAuth ? (
              <Sidebar />
            ) : (
              <p className="text-white">您尚未登入😥</p>
            )}
            {/* Outlet相當於子頁區域呈現內容 */}
            {/* <Outlet /> */}
            {auth.isAuth ? <Outlet /> : ``}
          </div>
        </div>
      </section>
    </>
  )
}

export default UserLayout
