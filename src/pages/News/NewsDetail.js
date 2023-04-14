import '../../styles/News/newsDetail.scss'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { FaAngleRight } from 'react-icons/fa'

function NewsDetail() {
  const [NewsDetail, setNewsDetail] = useState([])
  const { itemID } = useParams()
  useEffect(() => {
    // console.log('文章詳細')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getNewsDetail() {
      //網址要跟後端GET一樣
      let response = await axios.get(`http://localhost:3001/news/${itemID}`)
      setNewsDetail(response.data)
    }
    getNewsDetail()
  }, [itemID])

  return (
    <>
      <section className="newsdetail">
        {NewsDetail.map((newsdetail, i) => {
          return (
            <div className="container" key={newsdetail.id}>
              <div className=" main_color productDetail_header top_p">
                <Link to="/news" className="productDetail_link">
                  最新消息
                </Link>
                <FaAngleRight className="productDetail_header_icon" />

                <p>{newsdetail.article_title}</p>
              </div>

              <div className="tit">
                <p className="fw-bold">{newsdetail.article_title}</p>
              </div>
              <div className="left_pic row">
                <div className="col-6">
                  <img
                    src={`${process.env.REACT_APP_NODE_URL}/public/upload/article/${newsdetail.article_img}`}
                    className="newsdetail_img"
                    alt="newsdetail.article_img"
                  />
                </div>
                <div className="col-6">
                  <p className="fw-bold">{newsdetail.article_content}</p>
                </div>
              </div>
              <div className="p_time">
                <p className="fw-bold">｜建立日期　{newsdetail.create_time}</p>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default NewsDetail
