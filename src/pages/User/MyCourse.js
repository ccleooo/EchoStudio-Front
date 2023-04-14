import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'

import '../../styles/User/myCourse.scss'
import { MdArrowForwardIos } from 'react-icons/md'

function MyCourse() {
  const [classOrder, setClassOrder] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    // console.log('線上課程訂單')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getClassOrder() {
      let response = await axios.get(
        `http://localhost:3001/user/class_order/${auth.user.id}`
      )
      setClassOrder(response.data)
    }
    getClassOrder()
  }, [auth.user.id])

  return (
    <section className="page_bg col-md-10">
      <div className="container">
        <h1 className="fw-bold three_color">我的課程</h1>
        <div className="content_bg">
          <div className="all_card">
            {/* 第一排 */}
            <div className="row">
              {classOrder.map((classOrders, i) => {
                return (
                  <div
                    className="col-lg-4 col-sm-2 class_card"
                    key={classOrders.id}
                  >
                    <div className="card-body card-body_course">
                      <img
                        className="class_video"
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${classOrders.class_img}`}
                        alt="class_video"
                      />

                      <div className="class_card-text">
                        <h4 className="class_content_name">
                          {classOrders.class_name}
                        </h4>
                        <div className="go_comment_button " role="button">
                          <Link
                            to={`/coursedetail/${classOrders.class_id}`}
                            className="go_comment link"
                          >
                            前往評論
                            <MdArrowForwardIos className="go_comment_icon" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyCourse
