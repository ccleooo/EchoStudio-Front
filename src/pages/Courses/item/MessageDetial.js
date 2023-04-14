function MessageDetial(props) {
  const { messageReplay, replayDataAdd } = props
  return (
    <>
      {replayDataAdd
        .filter((message) => message.class_message_id === messageReplay)
        .map((v, index) => {
          return (
            <div className="teacher_message" key={v.id}>
              <div className="teacher_message_border">
                <img
                  className="teacher_message_img"
                  src={`${process.env.REACT_APP_NODE_URL}/public/upload/user/${v.user_img}`}
                  alt={v.user_img}
                ></img>
              </div>
              <div className="teacher_message_name_date_text">
                <div className="teacher_message_name_border">
                  <p
                    className={
                      v.user_level_id === 3
                        ? 'teacher_message_name'
                        : 'user_message_name'
                    }
                  >
                    {v.user_name}
                  </p>
                  <div className="teacher_message_date">
                    <p className="">{v.creat_time}</p>
                  </div>
                </div>
                <div className="teacher_message_text">
                  <p>{v.replay}</p>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default MessageDetial
