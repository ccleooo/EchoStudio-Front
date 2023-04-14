import '../styles/QA/faq.scss'
import Accordion from 'react-bootstrap/Accordion'
import * as React from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { Link } from 'react-router-dom'

// importing aos
// npm install --save aos@next
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function Faq() {
  useEffect(() => {
    AOS.init()
  }, [])
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <section className="container">
        <div className="banner_qa"></div>
        <p className="banner_text">FAQ</p>
      </section>

      <section className="container text-center">
        <div className="row">
          <div className="col">
            <h2 className="text-white title_faq">FAQ</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 title d-grid ">
            <TabContext value={value}>
              <div className="faq_tabs">
                <TabList onChange={handleChange}>
                  <Tab className="btn faq_btn" label="會員相關" value="1" />
                  <Tab className="btn faq_btn" label="購物須知" value="2" />
                  <Tab className="btn faq_btn" label="訂單常見問題" value="3" />
                  <Tab
                    className="btn faq_btn"
                    label="運送/付款相關"
                    value="4"
                  />
                </TabList>
              </div>

              {/* 會員相關 */}
              <TabPanel
                value="1"
                className="courseDetail_table_TabPane text-start"
              >
                <Accordion
                  defaultActiveKey={['0']}
                  alwaysOpen
                  data-aos="fade-up"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>如何加入會員？</Accordion.Header>
                    <Accordion.Body>
                      請於 Echo Studio{' '}
                      <Link to="../login" className="text-warning">
                        【登入 / 註冊】
                      </Link>
                      加入會員。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>加入會員的好處？</Accordion.Header>
                    <Accordion.Body>
                      (1) 會員可享有專屬購物優惠。
                      <br /> (2) 不定時發放折價券至會員帳戶。
                      <br /> (3) 累積一定金額可升級本站VIP。
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </TabPanel>
              {/* 購物須知 */}
              <TabPanel
                value="2"
                className="courseDetail_table_TabPanel text-start"
              >
                <Accordion
                  defaultActiveKey={['0']}
                  alwaysOpen
                  data-aos="fade-up"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>我要如何購買商品？</Accordion.Header>
                    <Accordion.Body>
                      【網路訂購流程】
                      <br />
                      Step1. 選擇商品：您可透過「關鍵字」搜尋您感興趣的商品。
                      <br />
                      Step2.
                      購買方式：請選擇「放入購物車」或「直接購買」方式購買。
                      <br />
                      Step3. 會員確認：若您已是Echo
                      Studio購會員，請直接登入。若非會員，請先【加入會員】。
                      <br />
                      Step4. 選擇商品數量： 選擇您需要的商品規格及數量。
                      <br />
                      Step5. 結帳方式：
                      請選擇付款方使以及折價券，付款完成，即可完成訂單。
                      <br />
                      Step7. 結帳完成： 完成訂單後，我們將於 7
                      個工作天內將商品配送給您。（不含週六、日及國定假日。部份預購、特別訂製商品除外）
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>我要如何查詢訂購紀錄？</Accordion.Header>
                    <Accordion.Body>
                      請您至【會員中心】查詢訂購紀錄。
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </TabPanel>
              {/* 訂單常見問題 */}
              <TabPanel
                value="3"
                className="courseDetail_table_TabPanel text-start"
              >
                <Accordion
                  defaultActiveKey={['0']}
                  alwaysOpen
                  data-aos="fade-up"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      訂單成立後是否可以取消？
                    </Accordion.Header>
                    <Accordion.Body>
                      您於登入會員後，至『會員中心』→『訂單管理』使用取消訂單的功能，若無此選項，則表示負責廠商已受理訂單及進行包裝出貨，無法使用官網取消，請來電通知退貨；或使用『我的帳戶』→『我要詢問』諮詢客服。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      如何才能知道我的訂單是否成立？
                    </Accordion.Header>
                    <Accordion.Body>
                      請您至『會員中心』→『訂單管理』查詢訂單狀態。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      訂單成立時是否可指定日期送達？
                    </Accordion.Header>
                    <Accordion.Body>
                      物流配送時間為週一至週五9：00～18：00間，以物流公司人力及路線安排為主，恕難指定到貨日期，若有指定配送時間的需求，可嘗試於配送聯繫時，與物流另行約定。
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </TabPanel>
              {/* 運送付款相關 */}
              <TabPanel
                value="4"
                className="courseDetail_table_TabPanel text-start"
              >
                <Accordion
                  defaultActiveKey={['0']}
                  alwaysOpen
                  data-aos="fade-up"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      今天訂購商品可以明天到貨嗎？我有急用。
                    </Accordion.Header>
                    <Accordion.Body>
                      恕不接受未查帳前緊急出貨要求，避免造成出貨失誤。付款完成後，商品將於3個工作天內出貨（不含週六、週日及國定假日。部份預購、特別訂製商品除外）。若遇有其他人為或非人為因素，導致貨品無法於期限內配達，我們將會以電話或電子郵件主動通知您。提醒您，商品若經兩次無法順利配達，由本公司以電話與電子郵件通知，逾三日無法成功與您聯繫，本公司將協助辦理退貨及全額退款逾期點數則失效，不另行通知。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      請問可以離島/海外配送嗎？
                    </Accordion.Header>
                    <Accordion.Body>
                      目前網路通路未提供離島/國外運送，因貨品材積大小重量運費均不等，請務必先來訊討論運費。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      有提供哪些付款方式 & 運送方式？
                    </Accordion.Header>
                    <Accordion.Body>
                      付款方式：線上刷卡、到店取貨付款 <br />
                      配送方式：宅配、到店自取
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>刷卡需付手續費嗎？</Accordion.Header>
                    <Accordion.Body>
                      Echo Studio
                      提供您便捷、優惠的購物環境，所有的商品標價均已含稅額、運費、刷卡手續費等，無須額外支付費用，請您放心。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>可以指定配送時間嗎？</Accordion.Header>
                    <Accordion.Body>
                      物流配送時間為週一至週五9：00～18：00間，以物流公司人力及路線安排為主，恕難指定到貨日期，若有指定配送時間的需求，可嘗試於配送聯繫時，與物流另行約定。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>可以指定配送時間嗎？</Accordion.Header>
                    <Accordion.Body>
                      物流配送時間為週一至週五9：00～18：00間，以物流公司人力及路線安排為主，恕難指定到貨日期，若有指定配送時間的需求，可嘗試於配送聯繫時，與物流另行約定。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      訂單成立超過兩週仍未收到商品怎麼辦？
                    </Accordion.Header>
                    <Accordion.Body>
                      若商品缺貨或是延遲出貨，本公司將主動通知您，若是過兩週未接獲通知且未收到商品，可能是物流無法與您取得聯繫、配送地址無人可協助簽收，或地址不完整等因素，建議您於【會員中心】
                      → 【問與答】，向客服進一步詢問。
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>
                      訂單成立超過兩週仍未收到商品怎麼辦？
                    </Accordion.Header>
                    <Accordion.Body>
                      請您前往【會員中心】查詢訂單，若已出貨，即可透過物流單號確認配送進度。
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq
