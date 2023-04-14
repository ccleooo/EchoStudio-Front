import '../../styles/User/quesionDetail.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { useParams, useNavigate } from 'react-router-dom'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

function QuesionDetail() {
  const [QuesionDetail, setQuesionDetail] = useState([])
  const [answer, setAnswer] = useState([])
  let navigate = useNavigate()
  //page
  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  const [totalPage, setTotalPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [nextPage, setNextPage] = useState(page)
  // console.log(QuesionDetail)
  useEffect(() => {
    // console.log('詢問紀錄')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getQuesionDetail(props) {
      //網址要跟後端GET一樣
      let response = await axios.get(
        `http://localhost:3001/user/quesion/quesionDetail?page=${page}`,
        { withCredentials: true }
      )

      setQuesionDetail(response.data.data)

      setTotalPage(response.data.pagination.totalPage)
      setNextPage(response.data.pagination.nextPage)
      setPrevPage(response.data.pagination.prevPage)
    }

    getQuesionDetail()
  }, [page])

  useEffect(() => {
    async function getAnswer(props) {
      //網址要跟後端GET一樣
      let response = await axios.get(`http://localhost:3001/answer`)
      setAnswer(response.data)
    }
    getAnswer()
  }, [])

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
            navigate(`/user/quesion/quesiondetail/?page=${i}`)
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
      <section className="qa_detail col-md-9">
        <div className="qa_detail_title">
          <p>詢問紀錄</p>
        </div>
        <div className="table-body">
          <table className="table main_color">
            <thead>
              <tr>
                <th>詢問日期</th>
                <th>問題</th>
                <th>回復</th>
              </tr>
            </thead>
            {QuesionDetail.map((table, i) => {
              return (
                <tbody key={table.id}>
                  <tr>
                    <td>{table.create_time}</td>
                    <td>{table.message}</td>
                    {answer.filter(
                      (answerQA) => answerQA.question_id === table.id
                    ).length === 0 ? (
                      <td className="text-white-50">尚未回覆問題</td>
                    ) : (
                      answer
                        .filter((answerQA) => answerQA.question_id === table.id)
                        .map((v, i) => {
                          return <td>{v.content}</td>
                        })
                    )}
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
        {/* page */}
        <div className="page ">
          {prevPage <= 0 ? (
            ''
          ) : (
            <button
              className="btn double_btn"
              onClick={(e) => {
                setPage(prevPage)
                navigate(`/user/quesion/quesiondetail?page=${prevPage}`)
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
                navigate(`/user/quesion/quesiondetail?page=${nextPage}`)
              }}
            >
              <FaAngleDoubleRight className="double_icon" />
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default QuesionDetail
