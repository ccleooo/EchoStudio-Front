import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SerImage1 from '../../images/sevice_01.png'
import SerImage2 from '../../images/sevice_02.png'

function ServiceDemo() {
  let navigate = useNavigate()

  return (
    <>
      <div className="col-md-6 col-sm-9 ps-lg-5 ps-md-3 ind_courses">
        <div className="row">
          <div className="col-md-6 courses_img">
            <img src={SerImage1} className="img-fluid" alt="SerImage1" />
          </div>
          <div className="col-md-6 service_box">
            <div
              className="service_box_link"
              role="button"
              onClick={() => {
                navigate('/course')
                window.location.reload()
              }}
            >
              <div className="flex_end">
                <div className="text_box">
                  <p className="second_color">線上課程</p>
                  <h2 className="main_color">Online Courses</h2>
                </div>
                <FaArrowRight className="arrow_icon main_color" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-9 ps-lg-5 ps-md-3">
        <div className="row">
          <div className="col-md-6 courses_img">
            <img src={SerImage2} className="img-fluid" alt="SerImage2" />
          </div>
          <div className="col-md-6 service_box">
            <div
              className="service_box_link"
              role="button"
              onClick={() => {
                navigate('/rehearsal')
                window.location.reload()
              }}
            >
              <div className="flex_end">
                <div className="text_box">
                  <p className="second_color">練團室租借</p>
                  <h2 className="main_color">Rehearsal Studio</h2>
                </div>
                <FaArrowRight className="arrow_icon main_color" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceDemo
