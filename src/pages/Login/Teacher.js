import '../../styles/Login/teacher.scss'
import { FaEnvelope } from 'react-icons/fa'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { ImKey } from 'react-icons/im'
import { FcGoogle } from 'react-icons/fc'

function Teacher() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-10 col-md-4 main_color teacher_login">
            <h1>教師登入</h1>
          </div>
        </div>

        <div className="teacher_login_form">
          <div className="row justify-content-center mt-4 ">
            <div className="col-10 col-md-3 d-flex flex-row">
              <FaEnvelope className="me-3 mt-2 login_icons" />
              <input
                type="email"
                className="form-control bg-transparent teacher_login_form_control"
                placeholder="請輸入信箱"
                id="email"
              />
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row">
              <ImKey className="me-3 mt-2 login_icons" />
              <input
                type="password"
                className="form-control bg-transparent teacher_login_form_control"
                placeholder="請輸入密碼"
                id="password"
              />
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-10 col-md-3 d-flex flex-row justify-content-between">
              <div className="form-check">
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
              </div>
              <div className="d-flex flex-row mb-3">
                <AiOutlineQuestionCircle className="question_icon" />
                <a href="http://localhost:3000/login/forgotPassword">
                  <p className="main_color">忘記密碼？</p>
                </a>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-10 col-md-3">
              <button className="btn btn-primary bold teacher_login_btn">
                登入
              </button>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-10 col-md-4">
            <div className="link-top"></div>
          </div>
        </div>

        <div className="row justify-content-center text-center mt-4">
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
        </div>
      </div>
    </>
  )
}

export default Teacher
