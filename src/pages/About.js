import React from 'react'
import '../styles/about.scss'
import aboutIMG from '../images/about/aboutIMG.png'
import service1 from '../images/about/online.png'
import service2 from '../images/about/online-course.png'
import service3 from '../images/about/rehearsal.png'
// import bottom2 from '../images/about/guitar.png'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

// importing aos
// npm install --save aos@next
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

// importing leaflet
// npm i react-leaflet
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function About(props) {
  const position = [24.985473757260618, 121.22204088955426]
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <>
      <section className="about_banner">
        <div className="about_header_bg main_color">
          <h1 className="container">ABOUT</h1>
        </div>
        <div className="container">
          <div className="about_text row">
            <div className="about_textz_left col-md-8 " data-aos="fade-up">
              <p className="main_color idea">品牌理念</p>
              <h2 className="four_color">
                追尋夢想的同時其他的就放心交給我們吧!
              </h2>
              <p className="text-white">
                創立於 1984
                年，是業界創新的指標性樂器公司；我們有完整的專業部門分工從樂器銷售、音樂教育、樂團賽事舉辦、舞台音響燈光器材配置架設、到樂器保固維修等全方位服務。
              </p>
              <p className="text-white">
                2017 年起，與 YAMAHA 台灣山葉音樂合作，共同推出 YAMAHA
                木吉他專門店及 YAMAHA
                數位鋼琴專門店，提供大眾更齊全、快速的樂器導覽！
              </p>
            </div>
            <div className="about_textz_right col-md-4">
              <img src={aboutIMG} alt="aboutIMG" />
            </div>
          </div>
        </div>
        <section
          className="
service_items"
        >
          <div className="container">
            <p
              className="service_items_title main_color border-bottom"
              data-aos="fade-right"
            >
              服務項目
            </p>
            <div className="row text-white service_list">
              <div className="col-md-4" data-aos="fade-right">
                <p>
                  <Link to="/product" className="text-white">
                    線上購物
                  </Link>
                </p>
                <img className="about_img" src={service1} alt="service1" />
              </div>
              <div className="col-md-4" data-aos="fade-right">
                <p>
                  <Link to="/rehearsal" className="text-white">
                    線上課程
                  </Link>
                </p>
                <img className="about_img" src={service2} alt="service2" />
              </div>
              <div className="col-md-4" data-aos="fade-right">
                <p>
                  <Link to="/courses" className="text-white">
                    練團室租借
                  </Link>
                </p>
                <img className="about_img" src={service3} alt="service3" />
              </div>
            </div>
          </div>
        </section>
        {/* about_bottom_box */}
        <section className="about_bottom_box">
          <div className="container">
            <div className="about_bottom row">
              <p
                className="main_color store_info mb-5 border-bottom"
                data-aos="fade-right"
              >
                門市資訊
              </p>
              <div className="col-md-4 ">
                <div className='data-aos="fade-right"'>
                  <MapContainer
                    style={{
                      height: '250px',
                      width: '370px',
                    }}
                    center={position}
                    zoom={15}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}></Marker>
                  </MapContainer>
                </div>
              </div>
              <div
                className="col-md-4 text-white about_address mt-3"
                data-aos="fade-right"
              >
                <p>
                  <a
                    href={`https://goo.gl/maps/wLyRfeyBD6WE2Vnx8`}
                    target="_blank"
                    className="text-white"
                    rel="noreferrer"
                  >
                    桃園市中壢區新生路二段421號
                  </a>
                </p>
                <p>(03)1234-567</p>
                <p>星期一 - 星期六 09:00-22:00</p>
              </div>
              {/* <div className="col-md-4">
                <img
                  className="about_bottom_img_right"
                  src={bottom2}
                  alt="bottom2"
                />
              </div> */}
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default About
