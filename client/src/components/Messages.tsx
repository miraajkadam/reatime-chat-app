import { useAuth } from 'hooks/use-auth'
import { MessageLeft, MessageRight } from './Message'

const Messages = ({ messages }: { messages: { author: string; message: string }[] }) => {
  const { user } = useAuth()

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {user?.name === message.author ? (
            <MessageRight message={message.message} author={message.author} />
          ) : (
            <MessageLeft message={message.message} author={message.author} />
          )}
        </div>
      ))}
    </div>
  )
}

export default Messages
