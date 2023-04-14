import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useAuth } from '../../hooks/useAuth'

import '../../styles/User/order.scss'
import { orderStatusMap } from '../../configs/orderStatus'

function Order(prop) {
  const [order, setOrder] = useState([])
  const [sortBy, setSortBy] = useState('日期新到舊')
  const [displayOrders, setDisplayOrders] = useState([])

  const { auth } = useAuth()

  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // console.log(backendURL)

  useEffect(() => {
    // console.log('訂單')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getOrder() {
      let response = await axios.get(
        `http://localhost:3001/user/orders/${auth.user.id}`,
        { withCredentials: true }
      )

      setOrder(response.data)
    }
    getOrder()
  }, [auth.user.id])

  //日期排序
  const handleSort = (orders, sortBy) => {
    let newOrders = [...orders]

    if (sortBy === '1') {
      newOrders = [...newOrders].sort(
        (a, b) => new Date(b.order_create_time) - new Date(a.order_create_time)
      )
    }
    if (sortBy === '2') {
      newOrders = [...newOrders].sort(
        (a, b) => new Date(a.order_create_time) - new Date(b.order_create_time)
      )
    }
    return newOrders
  }

  //處理排序過濾
  useEffect(() => {
    let newOrders = []

    // 處理排序
    newOrders = handleSort(order, sortBy)

    setDisplayOrders(newOrders)
  }, [order, sortBy])

  return (
    <section className="page_bg col-md-10">
      <div className="container">
        <div className="order_bar">
          <h1 className="fw-bold three_color">訂單查詢</h1>

          <select
            className="order-display"
            aria-label=".form-select-sm example"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="1">日期新到舊</option>
            <option value="2">日期舊到新</option>
          </select>
        </div>

        <div className="content_bg">
          <div className="wrapper">
            <Box className="order_pay_status">
              <TabContext value={value}>
                <Box id="tab" className="tabs">
                  <TabList onChange={handleChange}>
                    <Tab
                      label="未付款"
                      value="1"
                      type="button"
                      className="order_active"
                    />

                    <Tab
                      label="處理中"
                      value="2"
                      type="button"
                      className="main_color"
                    />
                    <Tab
                      label="待收貨"
                      value="3"
                      type="button"
                      className="main_color"
                    />

                    <Tab
                      label="已完成"
                      value="4"
                      type="button"
                      className="main_color"
                    />

                    <Tab
                      label="已取消"
                      value="5"
                      type="button"
                      className="main_color"
                    >
                      已取消
                    </Tab>
                  </TabList>
                </Box>

                <div id="tab-content" className="content tab-content-item">
                  <div className="show">
                    {/* 尚未付款 */}
                    {displayOrders.map((orders, i) => {
                      if (orders.order_status === 1) {
                        return (
                          <TabPanel
                            value="1"
                            className="order_list"
                            key={orders.id}
                          >
                            <div className="order_date ">
                              {orders.order_create_time}
                            </div>
                            <div className="order_content row">
                              <img
                                className="img-fluid col-3 order_img"
                                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orders.subject_img}`}
                                alt={orders.subject_img}
                              />
                              <div className="order_state col-6">
                                <p>
                                  訂單狀態:
                                  <span className="state">
                                    {orderStatusMap[orders.order_status]}
                                  </span>
                                </p>
                                <p>訂單編號: {orders.order_number}</p>
                                <p>交易金額: NT$ {orders.total_amount}</p>
                              </div>
                              <div className="col-3 order_button">
                                <Link
                                  to={`orderdetail/${orders.id}`}
                                  className="order_detail_button"
                                >
                                  查詢訂單詳情
                                </Link>
                              </div>
                            </div>
                          </TabPanel>
                        )
                      } else {
                        return null
                      }
                    })}

                    {/* 處理中 */}
                    {displayOrders.map((orders, i) => {
                      if (orders.order_status === 2) {
                        return (
                          <TabPanel
                            value="2"
                            className="order_list courseDetail_table_TabPanel"
                            key={orders.id}
                          >
                            <div className="order_date">
                              {orders.order_create_time}
                            </div>
                            <div className="order_content row">
                              <img
                                className="img-fluid col-3 order_img"
                                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orders.subject_img}`}
                                alt={orders.subject_img}
                              />
                              <div className="order_state col-6">
                                <p>
                                  訂單狀態:
                                  <span className="state_2">
                                    {orderStatusMap[orders.order_status]}
                                  </span>
                                </p>
                                <p>訂單編號: {orders.order_number}</p>
                                <p>交易金額:NT$ {orders.total_amount}</p>
                              </div>
                              <div className="col-3 order_button">
                                <Link
                                  to={`orderdetail/${orders.id}`}
                                  className="order_detail_button"
                                >
                                  查詢訂單詳情
                                </Link>
                              </div>
                            </div>
                          </TabPanel>
                        )
                      } else {
                        return null
                      }
                    })}

                    {/* 待收貨 */}
                    {displayOrders.map((orders, i) => {
                      if (orders.order_status === 3) {
                        return (
                          <TabPanel
                            value="3"
                            className="order_list courseDetail_table_TabPanel"
                            key={orders.id}
                          >
                            <div className="order_date">
                              {orders.order_create_time}
                            </div>
                            <div className="order_content row">
                              <img
                                className="img-fluid col-3 order_img"
                                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orders.subject_img}`}
                                alt={orders.subject_img}
                              />
                              <div className="order_state col-6">
                                <p>
                                  訂單狀態:
                                  <span className="state_3">
                                    {orderStatusMap[orders.order_status]}
                                  </span>
                                </p>
                                <p>訂單編號: {orders.order_number}</p>
                                <p>交易金額:NT$ {orders.total_amount}</p>
                              </div>
                              <div className="col-3 order_button">
                                <Link
                                  to={`orderdetail/${orders.id}`}
                                  className="order_detail_button"
                                >
                                  查詢訂單詳情
                                </Link>
                              </div>
                            </div>
                          </TabPanel>
                        )
                      } else {
                        return null
                      }
                    })}

                    {/* 已完成 */}
                    {displayOrders.map((orders, i) => {
                      if (orders.order_status === 4) {
                        return (
                          <TabPanel
                            value="4"
                            className="order_list courseDetail_table_TabPanel"
                            key={orders.id}
                          >
                            <div className="order_date">
                              {orders.order_create_time}
                            </div>
                            <div className="order_content row">
                              <img
                                className="img-fluid col-3 order_img"
                                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orders.subject_img}`}
                                alt={orders.subject_img}
                              />
                              <div className="order_state col-6">
                                <p>
                                  訂單狀態:
                                  <span className="state_4">
                                    {orderStatusMap[orders.order_status]}
                                  </span>
                                </p>
                                <p>訂單編號: {orders.order_number}</p>
                                <p>交易金額:NT$ {orders.total_amount}</p>
                              </div>
                              <div className="col-3 order_button">
                                <Link
                                  to={`orderdetail/${orders.id}`}
                                  className="order_detail_button"
                                >
                                  查詢訂單詳情
                                </Link>
                              </div>
                            </div>
                          </TabPanel>
                        )
                      } else {
                        return null
                      }
                    })}

                    {/* 已取消 */}
                    {displayOrders.map((orders, i) => {
                      if (orders.order_status === 5) {
                        return (
                          <TabPanel
                            value="5"
                            className="order_list courseDetail_table_TabPanel"
                            key={orders.id}
                          >
                            <div className="order_date">
                              {orders.order_create_time}
                            </div>
                            <div className="order_content row">
                              <img
                                className="img-fluid col-3 order_img"
                                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orders.subject_img}`}
                                alt={orders.subject_img}
                              />
                              <div className="order_state col-6">
                                <p>
                                  訂單狀態:
                                  <span className="state_5">
                                    {orderStatusMap[orders.order_status]}
                                  </span>
                                </p>
                                <p>訂單編號: {orders.order_number}</p>
                                <p>交易金額:NT$ {orders.total_amount}</p>
                              </div>
                              <div className="col-3 order_button">
                                <Link
                                  to={`orderdetail/${orders.id}`}
                                  className="order_detail_button"
                                >
                                  查詢訂單詳情
                                </Link>
                              </div>
                            </div>
                          </TabPanel>
                        )
                      } else {
                        return null
                      }
                    })}
                  </div>
                </div>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Order
