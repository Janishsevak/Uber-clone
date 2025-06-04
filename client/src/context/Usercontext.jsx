import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const Usercontext = ({children}) => {
  const [user, setUser] = useState(null)
  return (
      <UserDataContext.Provider value={{ user, setUser}}>{children}</UserDataContext.Provider>
  )
}

 
export default Usercontext;
