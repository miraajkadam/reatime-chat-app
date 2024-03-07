import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Users2 = () => {
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([])

  const { groupId } = useParams()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`http://localhost:5000/api/groups/${groupId}/users`)

      const { data } = await response.json()

      setUsers(data)
    })()
  }, [groupId])

  return (
    <Fragment>
      <h1>Group Users</h1>
      <ul>
        {users.map(user => (
          <Fragment key={user._id}>
            <li>{user.name}</li>
          </Fragment>
        ))}
      </ul>

      <Link to='add'>Add Users</Link>
      <Link to='remove'>Remove Users</Link>
    </Fragment>
  )
}

export default Users2
