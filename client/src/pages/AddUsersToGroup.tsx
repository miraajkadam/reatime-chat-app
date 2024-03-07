import { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AddUsersToGroup = () => {
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<{ [key: string]: boolean }>({})

  const { groupId } = useParams()

  const fetchUsersToBeAdded = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/api/groups/${groupId}/users?negation=true`)

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
      await fetchUsersToBeAdded()
    })()
  }, [fetchUsersToBeAdded])

  const handleAddUsers = async () => {
    const usersToBeAdded = []

    for (let userId in selectedUserIds) {
      if (selectedUserIds[userId]) {
        usersToBeAdded.push(userId)
      }
    }

    const response = await fetch(`http://localhost:5000/api/groups/${groupId}/addUsers`, {
      method: 'POST',
      body: JSON.stringify({
        users: usersToBeAdded,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })

    const data = await response.json()

    console.log(data)

    await fetchUsersToBeAdded()
  }

  return (
    <Fragment>
      <h1>Users that can be added</h1>

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
      <button onClick={handleAddUsers}>Add Selected Users</button>
    </Fragment>
  )
}

export default AddUsersToGroup
