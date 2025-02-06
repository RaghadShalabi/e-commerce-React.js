import React, { useContext } from 'react'
import { UserContext } from '../../../components/user/context/UserContext.jsx'

export default function Info() {

  const { userInfo, loading } = useContext(UserContext);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userInfo.userName}</p>
      <p>Email: {userInfo.email}</p>
    </div>
  )
}
