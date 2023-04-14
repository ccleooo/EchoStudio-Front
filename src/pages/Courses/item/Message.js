import Collapse from 'react-bootstrap/Collapse'
import { Modal, Button, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { FaSearch, FaCircle, FaRegComment } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import axios from 'axios'
import MessageDetial from './MessageDetial'
import * as React from 'react'
import ClassMessageDetailPeople from './ClassMessageDetailPeople'
import MessageForm from './MessageForm'
import { Toast } from '@douyinfe/semi-ui'

function Message(props) {
  const { messages, teachId } = props
  const [data, setData] = useState([])
  const [currentOpenId, setCurrentOpenId] = useState(0)
  const [chapterData, setChapterData] = useState('')
  const chapterString = chapterData.toString()
  const [filterMessage, setFilterMessage] = useState('')
  const messageString = filterMessage.toString()
  const { courseId } = useParams()
  const [userfrom, setUserfrom] = useState(false)
  const { auth } = useAuth()
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    async function getMessage() {
      let response = await axios.get(
        `http://localhost:3001/coursesMessages?chapter=${chapterString}&message=${messageString}`
      )
      setData(response.data)
      setCurrentOpenId(response.data)
    }
    getMessage()
  }, [chapterString, messageString, flag])

  useEffect(() => {
    async function getMessageForm() {
      let response = await axios.get(
        `http://localhost:3001/messageForm/${courseId}`,
        {
          withCredentials: true,
        }
      )
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserfrom(true)
      } else {
        setUserfrom(false)
      }
    }
    getMessageForm()
  }, [courseId, flag])

  // 回復
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const showModal = (cartItem) => {
    handleShow(cartItem)
  }

  const [replayDataAdd, setReplayDataAdd] = useState([])

  useEffect(() => {
    async function getReplayDataAdd() {
      let response = await axios.get(`http://localhost:3001/messageDetial`)
      setReplayDataAdd(response.data)
    }
    getReplayDataAdd()
  }, [flag])

  // 新增回覆
  let tzoffset = new Date().getTimezoneOffset() * 60000
  let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1)
  const [repalyDataID, setRepalyDataID] = useState({
    class_message_id: '',
    userId: auth.user.id,
    replay: '',
    created_time: localISOTime,
  })

  function handleChange(e) {
    setRepalyDataID({ ...repalyDataID, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()

    let response = await axios.post(
      'http://localhost:3001/coursesMessagesRepalyAdd',
      repalyDataID
    )
    Toast.success(response.data.msg)
    handleClose()
    setFlag(!flag)
  }

  return (
    <>
      <div className="courseDetail_question">
        <div className="courseDetail_question_select_search">
          <select
            className="courseDetail_question_select"
            role="button"
            onChange={(e) => {
              setChapterData(e.target.value)
            }}
          >
            <option
              className="question_select_option"
              role="button"
              value=""
              onClick={() => {
                setChapterData(' ')
              }}
            >
              全部章節
            </option>
            <option
              className="question_select_option"
              role="button"
              value="一"
              onClick={() => {
                setChapterData('一')
              }}
            >
              第一章節
            </option>
            <option
              className="question_select_option"
              role="button"
              value="二"
              onClick={() => {
                setChapterData('二')
              }}
            >
              第二章節
            </option>
            <option
              className="question_select_option"
              role="button"
              value="三"
              onClick={() => {
                setChapterData('三')
              }}
            >
              第三章節
            </option>
          </select>
          <div className="courseDetail_question_input">
            <input
              className="question_input"
              type="text"
              value={filterMessage}
              placeholder="搜尋看看~你的問題可能已經有人問過囉!"
              onChange={(e) => setFilterMessage(e.target.value)}
            />
            <FaSearch
              className="question_search_icon main_color"
              role="button"
            />
          </div>
        </div>
        <MessageForm
          messageData={data}
          userfrom={userfrom}
          setUserfrom={setUserfrom}
          refresh={() => setFlag(!flag)}
        />
        <div className="courseDetail_question_main_body">
          {data.filter((comm) => comm.class_id === messages).length === 0 ? (
            <div className="teacher_user courseDetail_question_teacher">
              <div className="question_user_right">
                <p className="question_user_title four_color">尚無討論</p>
              </div>
            </div>
          ) : (
            data
              .filter((comm) => comm.class_id === messages)
              .map((item, index) => {
                return (
                  <div
                    className="teacher_user courseDetail_question_teacher"
                    key={item.id}
                    value={item.id}
                  >
                    <div className="question_user_left">
                      <img
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/user/${item.user_img}`}
                        alt={item.user_img}
                        className="question_user_img"
                      ></img>
                    </div>
                    <div className="question_user_right">
                      <p className="question_user_chapter four_color">
                        第{item.chapter}章
                      </p>
                      <p className="question_user_title four_color">
                        {item.message}
                      </p>
                      <div className="question_user_name_date_message main_color">
                        <p className="question_user_name">{item.user_name}</p>
                        <FaCircle className="question_user_round" />
                        <p className="question_user_date">
                          {item.created_time}
                        </p>
                        <FaRegComment
                          className="question_user_message"
                          onClick={() => {
                            setCurrentOpenId(item.id)
                          }}
                          aria-controls="collapse-text"
                          aria-expanded={item.id === currentOpenId}
                          role="button"
                        />
                        <ClassMessageDetailPeople
                          classmessagedetailpeople={item.id}
                          refresh={() => setFlag(!flag)}
                        />
                        {auth.user.id === teachId ? (
                          <button
                            type="button"
                            className="question_replay"
                            onClick={() => {
                              const cartItem = { ...item }
                              // 商品原本無數量屬性(quantity)，要先加上
                              showModal(cartItem)
                              setRepalyDataID({
                                ...repalyDataID,
                                class_message_id: item.id,
                              })
                            }}
                          >
                            回覆
                          </button>
                        ) : (
                          <div>
                            {userfrom === false ? (
                              ''
                            ) : (
                              <button
                                type="button"
                                className="question_replay"
                                onClick={() => {
                                  const cartItem = { ...item }
                                  // 商品原本無數量屬性(quantity)，要先加上
                                  showModal(cartItem)
                                  setRepalyDataID({
                                    ...repalyDataID,
                                    class_message_id: item.id,
                                  })
                                }}
                              >
                                回覆
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <Collapse in={item.id === currentOpenId}>
                        <div>
                          <MessageDetial
                            messageReplay={item.id}
                            replayDataAdd={replayDataAdd}
                            setReplayDataAdd={setReplayDataAdd}
                          />
                        </div>
                      </Collapse>
                    </div>
                  </div>
                )
              })
          )}

          <Modal
            show={show}
            onHide={handleClose}
            className="courses_modal_addcart"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="modal_course_tital">回覆評論</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="modal_course_name">
                    名稱：{auth.user.name}
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>輸入回覆內容</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="modal_course_textarea"
                    rows={3}
                    method="post"
                    name="replay"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} className="modal_cousrse_no_btn">
                取消
              </Button>
              <Button onClick={handleSubmit} className="modal_cousrse_add_btn">
                送出
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Message
