import { MethodType, sendRequest } from 'lib/apiHelper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddGroup = () => {
  const [groupName, setGroupName] = useState<string>('')
  const navigate = useNavigate()

  const addGroup = async () => {
    const response = await sendRequest('/groups', MethodType.POST, {
      name: groupName,
    })

    if (!response.success) {
      alert('Unable to add group')
      console.error(response.message)

      return
    } else {
      navigate('/groups')
    }
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <label htmlFor='groupName'>Enter Group Name: </label>
        <input
          type='text'
          name='groupName'
          value={groupName}
          onChange={e => {
            setGroupName(e.target.value)
          }}
        />
        <input type='submit' onClick={addGroup} />
      </form>
    </div>
  )
}

export default AddGroup
