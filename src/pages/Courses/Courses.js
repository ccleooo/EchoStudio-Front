import '../../styles/Courses/courses.scss'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import banner_courses from '../../images/course/Courses.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import CommentsPeople from './item/CommentsPeople'
import CommentTotal from './item/CommentTotal'
import CoursesStar from './item/CoursesStar'
function Courses() {
  const [courses, setCourses] = useState([])
  let navigate = useNavigate()
  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  const [totalPage, setTotalPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [nextPage, setNextPage] = useState(page)
  // console.log('---19---', courses)
  useEffect(() => {
    async function getCourses() {
      let response = await axios.get(
        `http://localhost:3001/courses?page=${page}`
      )
      setCourses(response.data.data)
      setTotalPage(response.data.pagination.totalPage)
      setNextPage(response.data.pagination.nextPage)
      setPrevPage(response.data.pagination.prevPage)
    }
    getCourses()
  }, [page])

  const getPages = () => {
    let pages = []
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          className="class_page_btn"
          style={{ backgroundColor: page === i ? '#888276' : 'transparent' }}
          key={i}
          onClick={(e) => {
            setPage(i)
            navigate(`/courses?page=${i}`)
          }}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  return (
    <>
      <section className="banner_courses">
        <img src={banner_courses} alt=""></img>
      </section>
      <section className="container">
        <div className="row class_title flex_align padding">
          <div className="col class_title_left four_color">
            一起當靠譜的人！
          </div>
          <div className="col class_title_right main_color">
            大台北最專業師資，授課教師均擁有Yamaha PMC講師資格及良民證。
            <br />
            30餘年教學經驗，陣容堅強且專業，客製化教學內容，
            <br />
            無論是新手入門或進階學習者都能為您量身訂做課程內容及學習進度。
            <br />
            政府立案(北市補習班證字6871)，學習有保障。
            <br />
            優良舒適的學習空間，樂器設備一應俱全，提供電鋼琴、爵士鼓、
            <br />
            吉他、貝斯上課之用，讓敦煌學員不需帶著樂器奔波上課，
            <br />
            樂器練習室也不限時段免費使用。
          </div>
        </div>
        <div className="row class_all">
          {courses.map((v, i) => {
            return (
              <div className="col-md-4 class_card" key={v.id}>
                <Link to={`/coursedetail/${v.id}`}>
                  <div className="courses_card">
                    <img
                      className="card_img_top"
                      src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${v.class_img}`}
                      alt={v.class_img}
                    />
                    <div className="card_body flex_align">
                      <div className="card_text main_color">
                        <p>{v.class_name}</p>
                        <div className="star_evaluate">
                          <CoursesStar coursesStar={v.id} />
                          <CommentTotal totalTotal={v.id} />
                        </div>
                        <p className="time_log">課時 {v.hours} 分鐘</p>
                        <div className="people_price">
                          <div className="people main_color">
                            <CommentsPeople totalPeople={v.id} />
                          </div>
                          <p className="price four_color">
                            NT ${v.class_price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="page">
          {prevPage <= 0 ? (
            ''
          ) : (
            <button
              className="btn double_btn"
              onClick={(e) => {
                setPage(prevPage)
                navigate(`/courses?page=${prevPage}`)
              }}
            >
              <FaAngleDoubleLeft className="doublet_icon" />
            </button>
          )}

          {getPages()}

          {page === totalPage ? (
            ''
          ) : (
            <button
              className="btn double_btn"
              onClick={(e) => {
                setPage(nextPage)
                navigate(`/courses?page=${nextPage}`)
              }}
            >
              <FaAngleDoubleRight className="doublet_icon" />
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default Courses
