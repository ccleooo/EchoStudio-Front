import '../../styles/News/news.scss'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { useParams, useNavigate } from 'react-router-dom'

function News() {
  const [news, setNews] = useState([])
  // 過濾
  const [displayNews, setDisplayNews] = useState([])
  const [category, setCategory] = useState([])
  let navigate = useNavigate()

  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  const [totalPage, setTotalPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [nextPage, setNextPage] = useState(page)

  useEffect(() => {
    let queryString = new URLSearchParams({
      page: page,
      category_name: category,
    })
    // console.log('潮流新知')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getNews(props) {
      let response = await axios.get(
        `http://localhost:3001/news?${queryString.toString()}`
      )
      // console.log(`http://localhost:3001/news?${queryString.toString()}`)
      setNews(response.data.data)
      setTotalPage(response.data.pagination.totalPage)
      setNextPage(response.data.pagination.nextPage)
      setPrevPage(response.data.pagination.prevPage)
    }
    getNews()
  }, [page, category])

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
            navigate(`/news?page=${i}`)
          }}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  useEffect(() => {
    let newNews = [...news]

    // 處理排序
    // newProducts = handleSort(products, sortBy)

    setDisplayNews(newNews)
  }, [news])

  return (
    <>
      <section className="news_banner">
        <div className="news_header main_color">
          <h1 className="container">NEWS</h1>
        </div>
        <div className="container text-white">
          <div className="news_content">
            {/* news_content_top */}
            <div className="news_content_top row">
              <div className="breaking_news_left col-lg-5">
                <div className="ind_title main_color">
                  <div className="ind_title_wrap">
                    <div className="news_top">
                      <p>潮流新知</p>
                      <h2>Echo Studio</h2>
                    </div>
                    <h2>BREAKING NEWS</h2>
                  </div>
                </div>
              </div>
              <div className="breaking_news_right col-lg-7 main_color">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/upload/article/follow.png`}
                  className="breaking_right_img"
                  alt="article.article_img"
                />
                {/* <h5>{news.article_title}</h5>
                <p className="second_color">{news.article_content}</p> */}
              </div>
            </div>
            {/* new_course_tab */}
            <div className="new_course_tab">
              <button
                className="btn news_tab"
                onClick={() => {
                  setCategory('最新消息')
                }}
              >
                NEWS
              </button>
              <button
                className="btn news_tab"
                onClick={() => {
                  setCategory('課程資訊')
                }}
              >
                Course
              </button>
              <button
                className="btn news_tab"
                onClick={() => {
                  setCategory('精選文章')
                }}
              >
                Article
              </button>
            </div>
            {/* new_course_content */}
            <div className="new_course_box">
              {displayNews.map((item, i) => {
                return (
                  <div className="new_course_content row" key={item.id}>
                    <div className="new_course_left col-lg-3">
                      <div>
                        <img
                          src={`${process.env.REACT_APP_NODE_URL}/public/upload/article/${item.article_img}`}
                          className="new_course_img"
                          alt={item.article_img}
                        />
                      </div>
                    </div>
                    <div className=" new_course_right main_color col-lg-9">
                      <div className="new_course_text">
                        <div className="new_course_text_left">
                          <h5>{item.article_title}</h5>
                          <p className="second_color">{item.article_content}</p>
                        </div>
                        <div className="new_course_text_right">
                          <p className="main_color p_tab">
                            #{item.category_name}
                          </p>
                          <Link to={`/news/${item.id}`} className="more">
                            More
                          </Link>
                        </div>
                      </div>
                      <div className="new_course_bottom">
                        <p>{item.create_time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="page ">
        {prevPage <= 0 ? (
          ''
        ) : (
          <button
            className="btn double_btn"
            onClick={(e) => {
              setPage(prevPage)
              navigate(`/news?page=${prevPage}`)
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
              navigate(`/news?page=${nextPage}`)
            }}
          >
            <FaAngleDoubleRight className="double_icon" />
          </button>
        )}
      </div>
    </>
  )
}

export default News
