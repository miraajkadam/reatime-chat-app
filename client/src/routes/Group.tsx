import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Group = () => {
  const [group, setGroup] = useState<{ name: string }>()

  const { groupId } = useParams()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`http://localhost:5000/api/groups/${groupId}`)

      if (!response.ok) {
        console.error('Unable to fetch response for group')

        return
      }

      const { data } = await response.json()

      setGroup(data)
    })()
  }, [groupId])

  return (
    <Fragment>
      <h1>Group</h1>
      <h3>Name - {group?.name}</h3>

      <h2>
        <Link to={'users'}>Users</Link>
      </h2>
    </Fragment>
  )
}

export default Group
