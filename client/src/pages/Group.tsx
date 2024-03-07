import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { socket } from '../socket/socketConnection'
import { useAuth } from '../hooks/use-auth'

const Group = () => {
  const [group, setGroup] = useState<{ name: string }>()
  const [textMessage, setTextMessage] = useState<string>('')
  const { user } = useAuth()

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

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected')
    })
  }, [])

  const handleSendMessage = () => {
    console.log(textMessage)
  }

  return (
    <Fragment>
      <h1>Group</h1>
      <h3>Name - {group?.name}</h3>

      <h2>
        <Link to={'users'}>Users</Link>
      </h2>

      <textarea
        name='text_message_area'
        id='text_message_area'
        cols={30}
        rows={10}
        value={textMessage}
        onChange={e => {
          setTextMessage(e.target.value)
        }}
      ></textarea>
      <button onClick={handleSendMessage}>Send Message</button>
    </Fragment>
  )
}

export default Group
