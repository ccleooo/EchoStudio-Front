import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaRegComment } from 'react-icons/fa'
import { useAuth } from '../../../hooks/useAuth'
import axios from 'axios'
import { Toast } from '@douyinfe/semi-ui'

function MessageForm(props) {
  const { userfrom, refresh } = props
  const { auth } = useAuth()
  const { courseId } = useParams()
  let tzoffset = new Date().getTimezoneOffset() * 60000
  let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1)
  const [messageDataID, setMessageDataID] = useState({
    cousers: courseId,
    userId: auth.user.id,
    chapter: '',
    message: '',
    created_time: localISOTime,
  })
  function handleChange(e) {
    setMessageDataID({ ...messageDataID, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    // 關閉表單的預設行為
    e.preventDefault()
    let response = await axios.post(
      'http://localhost:3001/coursesMessagesAdd',
      messageDataID
    )
    Toast.success(response.data.msg)
    refresh()
    setMessageDataID({ ...messageDataID, message: '', chapter: '' })
  }

  return (
    <>
      {userfrom ? (
        <form className="message_board_question" method="post">
          <div className="message_board_question_text_icon">
            <p className="message_board_question_text">我要討論</p>
            <FaRegComment className="message_board_question_icon" />
          </div>
          <div className="message_question_name_star">
            <p className="message_question_name">名稱：{auth.user.name}</p>
            <div className="message_question_star_text_icon">
              <select
                className="message_questionn_select"
                role="button"
                value={messageDataID.chapter}
                onChange={handleChange}
                name="chapter"
              >
                <option className="message_questionn_option" value="">
                  選擇章節
                </option>
                <option className="message_questionn_option" value="一">
                  第一章節
                </option>
                <option className="message_questionn_option" value="二">
                  第二章節
                </option>
                <option className="message_questionn_option" value="三">
                  第三章節
                </option>
              </select>
            </div>
          </div>
          <textarea
            className="message_question_textarea"
            placeholder="請輸入討論內容。"
            rows="4"
            cols="100"
            name="message"
            id="message"
            value={messageDataID.message}
            onChange={handleChange}
          ></textarea>
          <button
            className="course_message_question_btn"
            onClick={handleSubmit}
          >
            送出
          </button>
        </form>
      ) : (
        0
      )}
    </>
  )
}

export default MessageForm
