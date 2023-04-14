import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/Courses/courseDetail.scss'
import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CourseLike from './item/CourseLike'
import { FaUserAlt, FaRegClock, FaFacebook, FaYoutube } from 'react-icons/fa'

import Comment from './item/Comment'
import Message from './item/Message'
import CourseDetailStar from './item/CourseDetailStar'
import CourseDetailPeople from './item/CourseDetailPeople'
import CoursesDetailInf from './item/CoursesDetailInf'
import { useSecondCart } from '../../utils/useSecondCart'
import { useAuth } from '../../hooks/useAuth'
import { Toast } from '@douyinfe/semi-ui'

function CourseDetail() {
  let navigate = useNavigate()
  const [userfrom, setUserfrom] = useState(false)
  const { auth } = useAuth()
  const secondCart = useSecondCart()
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [data, setData] = useState([])
  const { courseId } = useParams()
  const [commentFormData, setCommentFormData] = useState([])
  // 用 []，component 第一次初始化的時候會跑到
  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `http://localhost:3001/courses/${courseId}`
      )
      setData(response.data)
    }
    getData()
  }, [courseId])

  useEffect(() => {
    async function getMessageForm() {
      let response = await axios.get(
        `http://localhost:3001/messageForm/${courseId}`,
        {
          withCredentials: true,
        }
      )
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserfrom(true)
      } else {
        setUserfrom(false)
      }
      setCommentFormData(response.data)
    }
    getMessageForm()
  }, [courseId])

  return (
    <>
      {data.map((item) => {
        const dataInformation = `${item.information}`
        return (
          <section className="container courseDetail" key={item.id}>
            <div className="courseDetail_title flex_align main_color course_padding">
              <p>{item.class_name}</p>
            </div>
            <div>
              <div className="row courseDetail_main">
                <div className="col-lg-7 main_left">
                  <img
                    className="img_fluid_coursedetail"
                    src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${item.class_img}`}
                    alt={item.class_img}
                  />
                </div>
                <div className="col-lg-5 main_right main_right_dflex">
                  <div className="main_right_body">
                    <div className="star_like">
                      <div className="star_like_people">
                        <div>
                          <CourseDetailStar courseDetailStar={item.id} />
                        </div>
                        <CourseDetailPeople courseDetailPeople={item.id} />
                      </div>

                      <CourseLike CourseDetailData={data} />
                    </div>
                    <div>
                      <p className="courseDetail_time main_color">
                        {item.chapter} 個章節，共 {item.hours} 分鐘
                      </p>
                    </div>
                    <div className="people_time_price">
                      <div className="d-flex">
                        <div className="people">
                          <FaUserAlt className="people_icon main_color" />
                          <CoursesDetailInf coursesDetailInf={item.id} />
                        </div>
                        <div className="time">
                          <FaRegClock className="time_icon main_color" />
                          <p className="four_color">{item.hours}分鐘</p>
                        </div>
                      </div>
                      <div className="price three_color">
                        <p className="price_NT ">NT$</p>
                        <p className="price_dollar">{item.class_price}</p>
                      </div>
                    </div>
                    {auth.user.id === item.user_id ? (
                      <div className="shopping_inCart_buy">
                        <div className="shopping_buy">
                          <p className="shopping_text black">授課老師</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {userfrom ? (
                          <div className="shopping_inCart_buy">
                            <div className="shopping_buy">
                              <p className="shopping_text black">已購買</p>
                            </div>
                          </div>
                        ) : (
                          <div className="shopping_inCart">
                            {auth.isAuth ? (
                              <div
                                role="button"
                                className="shopping"
                                onClick={() => {
                                  const addCourseItem = {
                                    ...item,
                                    quantity: 1,
                                    product_price: 0,
                                    completed: false,
                                  }
                                  secondCart.addItem(addCourseItem)
                                  navigate('/cart', { replace: true })
                                }}
                              >
                                <p className="shopping_text black">立即購買</p>
                              </div>
                            ) : (
                              <div
                                role="button"
                                className="shopping"
                                onClick={() => {
                                  Toast.warning('尚未登入')
                                }}
                              >
                                <p className="shopping_text black">立即購買</p>
                              </div>
                            )}

                            <div
                              className="inCart"
                              role="button"
                              onClick={() => {
                                const addCourseItem = {
                                  ...item,
                                  quantity: 1,
                                  product_price: 0,
                                  completed: false,
                                }
                                secondCart.addItem(addCourseItem)
                                Toast.success('加入成功')
                              }}
                            >
                              <p className="inCart_text">加入購物車</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Box>
              <TabContext value={value}>
                <Box className="course_introduction">
                  <TabList onChange={handleChange}>
                    <Tab label="課程簡介" value="1" />
                    <Tab label="課程評價" value="2" />
                    <Tab label="問題研討" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" className="courseDetail_table_TabPanel">
                  <div className="courseDetail_introduction">
                    <div
                      dangerouslySetInnerHTML={{ __html: dataInformation }}
                    />
                    <div className="introduction_bg">
                      <p>超強師資</p>
                    </div>
                    <div className="courseDetail_teacher">
                      <div className="courseDetail_teacher_bg">
                        <div className="teacher_left">
                          <img
                            className="teacher_img"
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/user/${item.user_img}`}
                            alt={item.user_img}
                          />
                          <p className="teacher_name four_color">
                            {item.user_name}
                          </p>
                          <p className="teacher_email four_color">
                            {item.user_mail}
                          </p>
                          <div className="teacher_icon_all">
                            <a href={item.teacher_fb}>
                              <FaFacebook className="teacher_icon main_color" />
                            </a>
                            <a href={item.teacher_youtube}>
                              <FaYoutube className="teacher_icon main_color" />
                            </a>
                          </div>
                        </div>
                        <div className="teacher_hr"></div>
                        <div className="teacher_right main_color">
                          <p>{item.teacher_info}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2" className="courseDetail_table_TabPanel">
                  <Comment comments={item.id} />
                </TabPanel>
                <TabPanel value="3" className="courseDetail_table_TabPanel">
                  <Message messages={item.id} teachId={item.user_id} />
                </TabPanel>
              </TabContext>
            </Box>
          </section>
        )
      })}
    </>
  )
}

export default CourseDetail
