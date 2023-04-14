import '../../styles/Login/forgotPassword.scss'
import { FaEnvelope } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Toast } from '@douyinfe/semi-ui'

function ForgotPassword() {
  const [email, setEmail] = useState({
    email: '',
  })

  function handleChange(e) {
    setEmail({ ...email, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let response = await axios.post('http://localhost:3001/send-mail', email, {
      // 為了跨源存取 cookie
      withCredentials: true,
    })
    // console.log(response.data)
    Toast.success(response.data.msg)
  }

  return (
    <div className="container">
      {/* 登入/註冊切換按鈕 */}
      <div className="row justify-content-center">
        <div className="col-10 col-md-4 d-flex mt-5">
          <div className="login_register_btn ">
            <Link to="/login" className="btns main_color login_register_btns">
              會員登入
            </Link>
          </div>
          <div className="login_register_btn">
            <Link
              to="/login/register"
              className="btns main_color login_register_btns"
            >
              會員註冊
            </Link>
          </div>

          <div className="row justify-content-center">
            <div className="col-10 col-md-4">
              <hr width="100%" size="5" className="" />
            </div>
          </div>
        </div>
      </div>

      {/* 忘記密碼BOX */}
      <div className="forget_password_box">
        <div className="row justify-content-center">
          <div className="col-md-8 forget_password">
            <h4 className="text-center text-white py-3">忘記密碼</h4>
            <div className="link-top py-2"></div>
            <div className="d-flex flex-row  mt-3">
              <FaEnvelope className="me-3 mt-2 login_icons" />
              <input
                type="email"
                className="form-control bg-transparent user_login_form_control text-white"
                placeholder="請輸入信箱"
                id="email"
                name="email"
                value={email.email}
                onChange={handleChange}
              />
            </div>
            <a href="#/">
              <p className="text-center mt-3 main_color"> 還不是會員？</p>
            </a>

            <button
              className="btn btn-primary bold mt-3 forget_password_btn"
              onClick={handleSubmit}
            >
              送出
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center text-center mb-4">
        <a
          href="http://localhost:3000/login/register"
          className="align-items-center"
        >
          <FcGoogle className="google_icon" />
        </a>
      </div>
    </div>
  )
}

export default ForgotPassword
