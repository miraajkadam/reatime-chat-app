import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Groups = () => {
  const [groups, setGroups] = useState<
    {
      name: string
      _id: string
    }[]
  >([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:5000/api/groups')

      if (!response.ok) {
        console.error('An error occurred while fetching groups', response.statusText)

        return
      }

      const { data } = await response.json()

      setGroups(data)
    })()
  }, [])

  return (
    <table>
      <thead>
        <th>
          <td>Name</td>
        </th>
      </thead>

      <tbody>
        {groups.map(group => (
          <tr key={group._id}>
            <td>{group.name}</td>
            <Link to={`${group._id}`}>Explore</Link>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Groups
