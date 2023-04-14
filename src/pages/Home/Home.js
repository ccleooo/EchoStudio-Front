import React, { useState, useEffect } from 'react'
import ProductDemo from './ProductDemo'
import ServiceDemo from './ServiceDemo'
import FollowDemo from './FollowDemo'
import '../../styles/home.scss'
import '../../styles/animation.scss'
import { FaYoutube, FaMusic, FaAngleDoubleDown } from 'react-icons/fa'
import axios from 'axios'
// OwlCarousel
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

function Home(props) {
  // news
  useEffect(() => {
    // 在 component 初始化的時候跑一次
    // 通常會把去跟後端要資料的動作放在這裡
    async function getNews() {
      let response = await axios.get(`http://localhost:3001/home/article`)
      setNews(response.data)
    }
    getNews()
  }, [])

  const [news, setNews] = useState([])

  //Owl Carousel Settings
  const options = {
    loop: true,
    items: 1,
    margin: 20,
    nav: false,
    slideSpeed: 4000,
    paginationSpeed: 1000,
    autoplay: true,
    dot: false,
  }
  return (
    <>
      <section className="home_banner">
        <div className="container">
          <div className="content">
            <div className="text_left text-white">
              <h1>Music</h1>
              <h2>Feeds Your Soul</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12 wrap text-white">
              <div className="youtube">
                <a className="text-white" href="/">
                  <div className="banner_icon">
                    <FaYoutube />
                  </div>
                  <p>YouTube</p>
                </a>
              </div>
              <div className="line">
                <div className="style left"></div>
                <div className="style right"></div>
              </div>
              <div className="echo">
                <h2 className="main_color">Echo Studio</h2>
                <p>Music Change Your Life</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-lg-4 mt-md-3">
            <FaAngleDoubleDown className="animate_icon" />
          </div>
        </div>
      </section>
      <section className="breaking_news padding_75">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 ind_title main_color">
              <div className="ind_title_wrap">
                <div className="news_top">
                  <p>潮流新知</p>
                  <h2>Echo Studio</h2>
                </div>
                <h2>BREAKING NEWS</h2>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 ind_news">
              {news.length && (
                <OwlCarousel {...options}>
                  {news.map((v, i) => {
                    return (
                      <>
                        <div className="row position">
                          <div className="col-sm-7 col-11 news_wrap" key={v.id}>
                            <div className="ind_news_info">
                              <FaMusic className="music_icon" />
                              <p>{v.category_name}</p>
                            </div>
                            <div className="ind_news_title">
                              <h2 className="main_color">{v.article_title}</h2>
                            </div>
                            <div className="ind_news_content">
                              <p className="second_color">
                                {v.article_content}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-5 news_img_wrap">
                            <img
                              src={`${process.env.REACT_APP_NODE_URL}/public/upload/article/${v.article_img}`}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    )
                  })}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="index_product padding_75">
        <div className="container">
          <div className="row index_padding">
            <ProductDemo />
          </div>
        </div>
      </section>
      <section className="service padding_75">
        <div className="container">
          <div className="row ind_service">
            <ServiceDemo />
          </div>
        </div>
      </section>
      <section className="follow padding_75">
        <div className="container">
          <div className="follow_title main_color">
            <h1>ECHO STUDIO</h1>
            <p>專業品牌，值得擁有</p>
          </div>
          <div className="row align-items-center">
            <FollowDemo />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
