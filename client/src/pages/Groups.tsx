import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import { List, ListItemButton } from '@mui/material'
import { GetAllGroupsType } from '@server/types/groups.d'
import { MethodType, sendRequest } from 'lib/apiHelper'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Groups = () => {
  const [groups, setGroups] = useState<
    {
      name: string
      id: string
    }[]
  >([])

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const response = await sendRequest<GetAllGroupsType>('/groups', MethodType.GET)

      if (!response.success) {
        console.error('An error occurred while fetching groups', response.message)

        return
      } else {
        if (response.data) setGroups(response.data)
      }
    })()
  }, [])

  return (
    <List
      component='nav'
      sx={{
        maxWidth: 320,
      }}
    >
      {groups.map((group, index) => (
        <ListItemButton
          onClick={() => {
            navigate(`/groups/${group.id}`)
          }}
          key={index}
        >
          {group.name}
          <ListItemDecorator>
            <OpenInNewIcon />
          </ListItemDecorator>
        </ListItemButton>
      ))}
    </List>
  )
}

export default Groups
