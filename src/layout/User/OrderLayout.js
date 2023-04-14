import { Outlet } from 'react-router-dom'

function OrderLayout() {
  return (
    <>
      {/* Outlet相當於子頁區域呈現內容 */}
      <Outlet />
    </>
  )
}

export default OrderLayout
