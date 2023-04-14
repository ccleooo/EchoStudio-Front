import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ClassMessageDetailPeople(props) {
  const { classmessagedetailpeople, refresh } = props
  const [data, setData] = useState([])

  useEffect(() => {
    async function getClassMessageDetailPeople() {
      let response = await axios.get(
        `http://localhost:3001/classMessageDetailPeople`
      )
      setData(response.data)
    }
    getClassMessageDetailPeople()
  }, [refresh])
  const filterResult = data.filter(
    (totals) => totals.id === classmessagedetailpeople
  )
  if (filterResult.length === 0) {
    return <p className="question_user_peoples">0</p>
  } else {
    const qty = filterResult[0]
    return <p className="question_user_peoples">{qty.total}</p>
  }
}

export default ClassMessageDetailPeople
