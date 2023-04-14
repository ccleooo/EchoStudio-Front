import '../../styles/Login/login.scss'
import { FaEnvelope } from 'react-icons/fa'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { ImKey } from 'react-icons/im'
// import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Toast } from '@douyinfe/semi-ui'

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const [member, setMember] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let response = await axios.post(
      'http://localhost:3001/api/auth/login',
      member,
      {
        // 為了跨源存取 cookie
        withCredentials: true,
      }
    )
    // console.log(response.data)

    setAuth({ isAuth: true, user: response.data.user })
    Toast.success(response.data.msg)

    navigate('/user')
  }

  return (
    <>
      <div className="container">
        {/* 登入/註冊切換按鈕在LoginLayout.js */}
        <div className="row justify-content-center">
          <div className="col-10 col-md-4 d-flex mt-5">
            <div className="login_register_btn ">
              <Link to="/login" className="btns main_color login_active">
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
          </div>
        </div>

        {/* 登入：輸入帳號密碼 */}
        <div className="user_login_form">
          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row">
              <FaEnvelope className="me-3 mt-2 login_icons" />
              <input
                type="email"
                className="form-control bg-transparent user_login_form_control"
                placeholder="請輸入信箱"
                id="email"
                name="email"
                value={member.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row">
              <ImKey className="me-3 mt-2 login_icons" />
              <input
                type="password"
                className="form-control bg-transparent user_login_form_control"
                placeholder="請輸入密碼"
                id="password"
                name="password"
                value={member.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row justify-content-center mt-4 ">
            <div className="col-10 col-md-3 d-flex flex-row justify-content-end">
              {/* <div className="form-check">
                <input
                  className="form-check-input "
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label main_color"
                  for="flexCheckDefault"
                >
                  記住我
                </label>
              </div> */}
              <div className="d-flex flex-row mb-3">
                <AiOutlineQuestionCircle className="question_icon" />
                <Link to="forgotpassword" className="main_color">
                  忘記密碼？
                </Link>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-10 col-md-3">
              <button
                className="btn btn-primary bold user_login_btn"
                onClick={handleSubmit}
              >
                登入
              </button>
            </div>
          </div>
        </div>

        {/* 分線 */}
        {/* <div className="row justify-content-center mt-4">
          <div className="col-10 col-md-4">
            <div className="link-top"></div>
          </div>
        </div> */}

        {/* 快速登入 */}
        {/* <div className="row justify-content-center text-center mt-4">
          <div className="col-10 col-md-4 main_color login_or_register">
            <a href="#/" className="main_color mx-3">
              快速登入
            </a>
            <span />
            /
            <span />
            <a href="#/" className="main_color mx-3">
              註冊
            </a>
          </div>
          <a href="#/" className="align-items-center">
            <FcGoogle className="google_icon" />
          </a>
        </div> */}
      </div>
    </>
  )
}

export default Login
