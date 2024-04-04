import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GroupType } from '@server/types/groups.d'
import { MethodType, sendRequest } from 'lib/apiHelper'
import Messages from '../components/Messages'
import { useAuth } from '../hooks/use-auth'
import { socket } from '../socket/socketConnection'

const Group = () => {
  const [group, setGroup] = useState<{ name: string }>()
  const [textMessage, setTextMessage] = useState<string>('')
  const { user } = useAuth()
  const [messages, setMessages] = useState<{ author: string; message: string }[]>([])

  const { groupId } = useParams()

  useEffect(() => {
    ;(async () => {
      const response = await sendRequest<GroupType>(`/groups/${groupId}`, MethodType.GET)

      if (!response.success) {
        console.error('Unable to fetch response for group')
      } else {
        setGroup(response.data)
      }
    })()
  }, [groupId])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('receive_message_event', data => {
      console.log('message received', data)

      setMessages(prevMessages => [
        ...prevMessages,
        { author: data.user_name, message: data.message },
      ])
    })

    const data = {
      user_name: user?.name,
      user_id: user?.id,
      room_code: groupId,
    }

    socket.emit('join_group_event', data)
  }, [])

  const handleSendMessage = () => {
    const data = {
      user_name: user?.name,
      user_id: user?.id,
      room_code: groupId,
      message: textMessage,
    }

    socket.emit('send_message_event', data)

    setMessages(prevMessages => {
      return [
        ...prevMessages,
        {
          author: (user as any).name,
          message: textMessage,
        },
      ]
    })

    setTextMessage('')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Typography variant='h3' sx={{ marginTop: 1 }}>
        {group?.name}
      </Typography>
      {/* 
      <h2>
        <Link to={'users'}>Users</Link>
      </h2> */}

      <Messages messages={messages} />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          marginBottom: 1,
        }}
      >
        <TextField
          id='outlined-basic'
          label='Message'
          variant='outlined'
          name='text_message_area'
          value={textMessage}
          onChange={e => {
            setTextMessage(e.target.value)
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') handleSendMessage()
          }}
          autoComplete='off'
          sx={{
            width: '80%',
          }}
        />

        <Button onClick={handleSendMessage} sx={{ width: '15%' }} variant='outlined'>
          Send Message
        </Button>
      </Box>
    </Box>
  )
}

export default Group
