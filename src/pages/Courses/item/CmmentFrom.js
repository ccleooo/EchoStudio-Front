import { useEffect } from 'react'
import { FaStar, FaRegStar, FaRegComment } from 'react-icons/fa'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import { Toast } from '@douyinfe/semi-ui'

function CmmentFrom(props) {
  const { refresh } = props
  const { auth } = useAuth()
  const [rating, setRating] = useState(0)
  const { courseId } = useParams()
  const [userfrom, setUserfrom] = useState(false)
  const [commentFormData, setCommentFormData] = useState([])
  let tzoffset = new Date().getTimezoneOffset() * 60000
  let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1)
  const [commentAdd, setCommentAdd] = useState({
    userId: auth.user.id,
    order_product_id: '0',
    class_detail_id: ' ',
    create_time: localISOTime,
    comment: '',
    star: 0,
  })

  const handleRating = (rate) => {
    // console.log(rate)
    setCommentAdd({ ...commentAdd, star: rate })
    setRating(rate)
  }

  function handleChange(e) {
    setCommentAdd({ ...commentAdd, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()

    let response = await axios.post(
      'http://localhost:3001/commentsAdd',
      commentAdd
    )
    Toast.success(response.data.msg)
    // console.log(response.data)
    refresh()
  }

  const [aaa, setAaa] = useState([])
  useEffect(() => {
    async function getAaa() {
      let response = await axios.get(
        `http://localhost:3001/coursesComments/${courseId}`,
        {
          withCredentials: true,
        }
      )
      setAaa(response.data)
    }
    getAaa()
  }, [courseId, refresh])

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
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setCommentAdd({
          ...commentAdd,
          class_detail_id: response.data[0].id,
        })
      }
    }
    getMessageForm()
  }, [courseId, refresh])

  return (
    <>
      <div>
        {userfrom ? (
          <div>
            {aaa.length > 0 ? (
              <div className="courseDetail_evaluaten">
                <div className="evaluaten_main">
                  <div className="evaluaten_main_right">
                    <div className="evaluaten_main_right_text main_color">
                      <p>已留言</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form method="post" className="message_board">
                <div className="message_board_text_icon">
                  <p className="message_board_text">我要評價</p>
                  <FaRegComment className="message_board_icon" />
                </div>
                <div className="message_name_star">
                  <p className="message_name">名稱：{auth.user.name}</p>
                  <div className="message_star_text_icon">
                    <div>整體分數：</div>
                    <div className="message_star_icon">
                      <Rating
                        onChange={handleChange}
                        id="star"
                        name="star"
                        onClick={handleRating}
                        initialValue={rating}
                        value={commentAdd.star}
                        emptyIcon={<FaRegStar />}
                        fillIcon={<FaStar />}
                        fillColor="#FFB600"
                        emptyColor="#FFB600"
                        showTooltip
                        allowFraction
                        tooltipDefaultText="0"
                        tooltipArray={[
                          '0.5',
                          '1',
                          '1.5',
                          '2',
                          '2.5',
                          '3',
                          '3.5',
                          '4',
                          '4.5',
                          '5',
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  className="message_textarea"
                  placeholder="請輸入您的課程感受，讓ECHO越來越進步。"
                  rows="4"
                  cols="100"
                  type="text"
                  id="comment"
                  name="comment"
                  value={commentAdd.comment}
                  onChange={handleChange}
                ></textarea>
                <button className="course_message_btn" onClick={handleSubmit}>
                  送出
                </button>
              </form>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
export default CmmentFrom
