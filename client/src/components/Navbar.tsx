import MenuIcon from '@mui/icons-material/Menu'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

const drawerWidth = 240

const Navbar = (props: any) => {
  const navigate = useNavigate()

  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const { authed, logout } = useAuth()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Realtime Chat App
      </Typography>
      <Divider />
      {authed ? (
        <List>
          <ListItem key={'Groups'} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                navigate('/groups')
              }}
            >
              <ListItemText primary={'Groups'} />
            </ListItemButton>
          </ListItem>

          <ListItem key={'Add Group'} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                navigate('/groups/add')
              }}
            >
              <ListItemText primary={'Add Group'} />
            </ListItemButton>
          </ListItem>

          <ListItem key={'Sign Out'} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                logout()
              }}
            >
              <ListItemText primary={'Sign Out'} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem key={'Login'} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                navigate('/')
              }}
            >
              <ListItemText primary={'Login'} />
            </ListItemButton>
          </ListItem>

          <ListItem key={'SignUp'} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                navigate('/signup')
              }}
            >
              <ListItemText primary={'Sign Up'} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', marginBottom: '5rem' }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Realtime Chat App
          </Typography>
          {authed ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                key={'Groups'}
                sx={{ color: '#fff' }}
                onClick={() => {
                  navigate('/groups')
                }}
              >
                Groups
              </Button>

              <Button
                key={'Add Group'}
                sx={{ color: '#fff' }}
                onClick={() => {
                  navigate('/groups/add')
                }}
              >
                Add Group
              </Button>

              <Button
                key={'Sign Out'}
                sx={{ color: '#fff' }}
                onClick={() => {
                  logout()
                }}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                key={'Log In'}
                onClick={() => {
                  navigate('/')
                }}
                sx={{ color: '#fff' }}
              >
                Login
              </Button>
              <Button
                key={'Signup'}
                onClick={() => {
                  navigate('/signup')
                }}
                sx={{ color: '#fff' }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

export default Navbar
