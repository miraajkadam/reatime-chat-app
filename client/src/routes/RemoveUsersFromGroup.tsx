import { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const RemoveUsersFromGroup = () => {
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<{ [key: string]: boolean }>({})

  const { groupId } = useParams()

  const fetchUsersToBeRemoved = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/api/groups/${groupId}/users?negation=false`)

    const { data } = (await response.json()) as {
      message: string
      data: { name: string; _id: string }[]
    }

    setUsers(data)
    let asd: { [key: string]: boolean } = {}

    data.forEach(user => {
      asd[user._id] = false
    })

    setSelectedUserIds(asd)
  }, [groupId])

  useEffect(() => {
    ;(async () => {
      await fetchUsersToBeRemoved()
    })()
  }, [fetchUsersToBeRemoved])

  const handleRemoveUsers = async () => {
    const usersToBeRemoved = []

    for (let userId in selectedUserIds) {
      if (selectedUserIds[userId]) {
        usersToBeRemoved.push(userId)
      }
    }

    const response = await fetch(`http://localhost:5000/api/groups/${groupId}/removeUsers`, {
      method: 'POST',
      body: JSON.stringify({
        users: usersToBeRemoved,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })

    const data = await response.json()

    console.log(data)

    await fetchUsersToBeRemoved()
  }

  return (
    <Fragment>
      <h1>Users that can be removed</h1>

      {users.map(user => (
        <div key={user._id}>
          <input
            type='checkbox'
            name={user._id}
            value={user._id}
            onChange={event => {
              setSelectedUserIds(prevState => ({
                ...prevState,
                [event.target.value]: event.target.checked,
              }))
            }}
            checked={selectedUserIds[user._id]}
          />

          <label htmlFor={user._id}>{user.name}</label>
        </div>
      ))}
      <button onClick={handleRemoveUsers}>Remove Selected Users</button>
    </Fragment>
  )
}

export default RemoveUsersFromGroup
