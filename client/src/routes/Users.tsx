import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState<
    {
      email: string
      name: string
      _id: string
    }[]
  >([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:5000/api/users')

      if (!response.ok) {
        console.error('An error occurred while fetching users', response.statusText)

        return
      }

      const { data } = await response.json()

      setUsers(data)
    })()
  }, [])

  return (
    <table>
      <thead>
        <th>
          <td>Name</td>
          <td>Email</td>
        </th>
      </thead>

      <tbody>
        {users.map(user => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
