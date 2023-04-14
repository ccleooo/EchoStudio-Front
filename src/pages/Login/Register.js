import '../../styles/Login/register.scss'
import { FaEnvelope, FaUserAlt } from 'react-icons/fa'
import { ImKey } from 'react-icons/im'
// import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from '@douyinfe/semi-ui'

const Register = () => {
  const [member, setMember] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  let navigate = useNavigate()

  // email input 的 change
  // e.target ==> email input
  // name input 的 change
  // e.target ==> name input
  function handleChange(e) {
    // console.log(e);
    let newMember = { ...member }
    newMember[e.target.name] = e.target.value
    setMember(newMember)
  }

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()
    let response = await axios.post(
      'http://localhost:3001/api/auth/register',
      member
    )
    // console.log(response.data)
    Toast.success(response.data.msg)
    navigate('/login')
  }
  return (
    <div className="container">
      {/* 登入/註冊切換按鈕在LoginLayout.js */}
      <div className="row justify-content-center">
        <div className="col-10 col-md-4 d-flex mt-5">
          <div className="login_register_btn ">
            <Link to="/login" className="btns main_color login_register_btns ">
              會員登入
            </Link>
          </div>
          <div className="login_register_btn">
            <Link to="/login/register" className="btns main_color login_active">
              會員註冊
            </Link>
          </div>
        </div>
      </div>
      {/* 會員註冊內容 */}
      <form>
        {' '}
        <div className="user_register_form">
          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row">
              <FaUserAlt className="me-3 mt-2 login_icons" />
              <input
                type="text"
                className="form-control bg-transparent user_register_form_control"
                placeholder="請輸入暱稱"
                id="name"
                name="name"
                value={member.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row">
              <FaEnvelope className="me-3 mt-2 login_icons" />
              <input
                type="email"
                className="form-control bg-transparent user_register_form_control"
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
                className="form-control bg-transparent user_register_form_control"
                placeholder="請輸入8~12位半形字元"
                id="password"
                name="password"
                value={member.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row">
              <ImKey className="me-3 mt-2 login_icons" />
              <input
                type="password"
                className="form-control bg-transparent user_register_form_control"
                placeholder="再一次確認密碼"
                id="comfirmPassword"
                name="confirmPassword"
                value={member.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-10 col-md-3">
              <button
                className="btn btn-primary register_btn"
                onClick={handleSubmit}
              >
                立即註冊
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* 分線 */}
      {/* <div className="row justify-content-center mt-4">
        <div className="col-10 col-md-4">
          <div className="link-top"></div>
        </div>
      </div> */}

      {/* 快速登入 */}
      {/* <div className="row justify-content-center mt-4 text-center">
        <div className="main_color login_or_register ">快速登入 / 註冊</div>
        <a href="#/" className="align-items-center">
          <FcGoogle className="google_icon" />
        </a>
      </div> */}
    </div>
  )
}

export default Register
