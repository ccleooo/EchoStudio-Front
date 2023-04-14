import '../../styles/User/coupon.scss'
import { FaCheckSquare } from 'react-icons/fa'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useAuth } from '../../hooks/useAuth'
import { Toast } from '@douyinfe/semi-ui'

function Coupon() {
  const { auth } = useAuth()
  const [coupon, setCoupon] = useState([])
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    // console.log('優惠券')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getCoupon() {
      let response = await axios.get(
        // `http://localhost:3001/user/orders`
        `http://localhost:3001/user/coupon_detail/${auth.user.id}`
      )

      setCoupon(response.data)
    }
    getCoupon()
  }, [auth.user.id])

  return (
    <section className="page_bg col-md-10">
      <div className="container">
        <h1 className="fw-bold three_color">我的優惠券</h1>
        <div className="content_bg">
          <div className="wrapper">
            <Box className="coupon_use_status">
              <TabContext value={value}>
                <Box id="tab" className="tabs">
                  <TabList onChange={handleChange}>
                    <Tab
                      label="已領取"
                      value="1"
                      type="button"
                      className="coupon_active main_color"
                      // href="/"
                    />

                    <Tab
                      label="已使用"
                      value="2"
                      type="button"
                      className="main_color"
                      // href="/"
                    />
                    <Tab
                      label="已失效"
                      value="3"
                      type="button"
                      className="main_color"
                      // href="/"
                    />
                  </TabList>
                </Box>
                {/* 已領取 */}
                {coupon.map((coupons, i) => {
                  if (coupons.status === 1) {
                    return (
                      <TabPanel
                        value="1"
                        className="coupon_content row"
                        key={coupons.id}
                      >
                        <div className="col-3">
                          <img
                            className="coupon_ticket"
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/coupon/${coupons.coupon_img}`}
                            alt="coupon_ticket"
                          />
                        </div>

                        <div className="coupon_txt col-7">
                          <p className="main_color coupon_line_1">
                            {coupons.coupon_name}
                            <p> 全站適用 </p>
                          </p>
                          <p className="second_color coupon_line_2">
                            使用日期：{coupons.start_time}~{coupons.end_time}
                          </p>
                          <p className="four_color coupon_line_3">
                            優惠券代碼：{coupons.sn}
                          </p>
                        </div>

                        <div className="coupon_copy_button col-2">
                          <Link
                            role="button"
                            className="coupon_copy"
                            onClick={() => {
                              navigator.clipboard.writeText(coupons.sn)
                                ? Toast.success(`Coupon Copied`)
                                : Toast.warning('複製失敗，請自行複製')
                            }}
                          >
                            Copy
                          </Link>
                        </div>
                      </TabPanel>
                    )
                  } else {
                    return null
                  }
                })}
                {/* 已使用 */}
                {coupon.map((coupons, i) => {
                  if (coupons.status === 2) {
                    return (
                      <TabPanel value="2" className="coupon_content row">
                        <div className="col-3">
                          <img
                            className="coupon_ticket"
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/coupon/${coupons.coupon_img}`}
                            alt="coupon_ticket"
                          />
                        </div>

                        <div className="coupon_txt col-7">
                          <p className="main_color coupon_line_1">
                            {coupons.coupon_name}
                            <p>全站適用</p>
                          </p>
                          <p className="second_color coupon_line_2">
                            使用日期：{coupons.start_time}~{coupons.end_time}
                          </p>
                          <p className="four_color coupon_line_3">
                            優惠券代碼：{coupons.sn}
                          </p>
                        </div>
                        <div className=" coupon_done col-2">
                          <p className="coupon_state">
                            <FaCheckSquare className="coupon_check" />
                            已使用
                          </p>
                        </div>
                      </TabPanel>
                    )
                  } else {
                    return null
                  }
                })}
                {/* 已失效 */}
                {coupon.map((coupons, i) => {
                  if (coupons.status === 3) {
                    return (
                      <TabPanel value="3" className="coupon_content row">
                        <div className="col-3">
                          <img
                            className="coupon_ticket"
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/coupon/${coupons.coupon_img}`}
                            alt="coupon_ticket"
                          />
                        </div>

                        <div className="coupon_txt col-7">
                          <p className="main_color coupon_line_1">
                            {coupons.coupon_name}
                            <p>全站適用</p>
                          </p>
                          <p className="second_color coupon_line_2">
                            使用日期：{coupons.start_time}~{coupons.end_time}
                          </p>
                          <p className="four_color coupon_line_3">
                            優惠券代碼：{coupons.sn}
                          </p>
                        </div>
                        <div className=" coupon_done col-2">
                          <p className="coupon_state_2">已失效</p>
                          <p className="coupon_usetime_2">
                            失效時間:<br></br>
                            {coupons.end_time}
                          </p>
                        </div>
                      </TabPanel>
                    )
                  } else {
                    return null
                  }
                })}
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Coupon
