import { IncomingMessage, Server, ServerResponse } from 'http'
import { Server as SocketServer } from 'socket.io'
import {
  connection,
  join_group_event,
  receive_message_event,
  send_message_event,
} from './socketEvents'
// import { onGetRoomUsersEvent, onJoinRoomEvent } from './SocketEvents'

export const connectSocket = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },

    // set the maximum http request size to 100 mb (100 * 1024 * 1024 bytes)
    maxHttpBufferSize: 100 * 1024 * 1024,
  })

  io.on(connection, socket => {
    console.log(`A user connected having ID : ${socket.id}`)

    // joining the room
    socket.on(join_group_event, data => {
      socket.join(data.room_code)
    })

    // message
    socket.on(send_message_event, data => {
      // broadcasts the message to all clients connected to the specified room, except the sender.
      socket.to(data.room_code).emit(receive_message_event, data)
    })

    // room user details: [user_name, user_id]
    // socket.on('get_room_users_details', data => {
    //   // update room user details
    //   const roomUsers = onGetRoomUsersEvent(data, io) // list of [user_name, user_id]
    //   socket.emit('receiveRoomUsersEvent', roomUsers)
    // })

    // disconnect
    socket.on('disconnect', () => {
      console.log('A user disconnected having ID:', socket.id)
    })
  })
}
