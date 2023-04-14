import '../../styles/User/quesion.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Toast } from '@douyinfe/semi-ui'

function Quesion() {
  let tzoffset = new Date().getTimezoneOffset() * 60000
  let date = new Date(Date.now() - tzoffset).toISOString().slice(0, -1)

  const [contents, setContents] = useState({
    create_time: date,
    message: '',
  })

  async function handleSubmit(e) {
    //e.preventDefault()
    let response = await axios.post(
      // eslint-disable-next-line no-undef
      `http://localhost:3001/user/quesion`,
      contents,
      { withCredentials: true }
    )
    Toast.success(response.data.msg)
    setContents({ ...contents, message: '' })
  }
  return (
    <>
      <section className="qa col-md-9">
        <div className="qa_title">
          <p>我要詢問</p>
        </div>
        <div className="qa-body">
          <div className="record_btn">
            <Link to="QuesionDetail" className="qa_btn">
              詢問記錄
            </Link>
          </div>
          <div>
            <div className="qa_p">
              <p className="qa_text">問題:</p>
            </div>
            <div className="qa_big_typ">
              <textarea
                className="qa_textarea"
                type="text"
                placeholder="請輸入你的訊息，若是詢問店內特定商品，請留下商品名稱，謝謝"
                value={contents.message}
                id="message"
                name="message"
                onChange={(e) => {
                  setContents({ ...contents, [e.target.name]: e.target.value })
                }}
              ></textarea>
            </div>
            <div className="submit_btn">
              <button className="qa_submit_btn" onClick={handleSubmit}>
                送出
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Quesion
