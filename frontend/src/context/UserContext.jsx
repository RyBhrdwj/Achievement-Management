import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export const useUser = () => {
    return useContext(UserContext)
}

const UserProvider = (props) => {
    const [userRole,setUserRole] = useState('')
  return (
    <UserContext.Provider value={{userRole, setUserRole}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
