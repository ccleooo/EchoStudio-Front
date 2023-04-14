import React, {
  useState,
  useContext,
  createContext,
  useLayoutEffect,
} from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: {
      email: '',
      id: 0,
      name: '',
      account: '',
      birthday: '',
      phone: '',
      address: '',
      level: '',
      carrier: '',
      owner: '',
      number: '',
      dateline: '',
    },
  })

  useLayoutEffect(() => {
    async function getAuth() {
      let response = await axios.get(`http://localhost:3001/users/checkusers`, {
        // 為了跨源存取 cookie
        withCredentials: true,
      })
      if (response.data.id) {
        const {
          id,
          user_name,
          user_mail,
          user_account,
          carrier,
          user_level_id,
          user_address,
          user_birthday,
          user_phone,
          owner,
          number,
          dateline,
        } = response.data
        setAuth({
          user: {
            email: user_mail,
            id: id,
            name: user_name,
            account: user_account,
            birthday: user_birthday,
            phone: user_phone,
            address: user_address,
            level: user_level_id,
            carrier: carrier,
            owner: owner,
            number: number,
            dateline: dateline,
          },
          isAuth: true,
        })
      }
    }
    getAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
