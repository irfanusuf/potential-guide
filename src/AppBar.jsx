import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from "./assets/logo.png"
import { useNavigate } from 'react-router-dom';

const pages = ['Register', 'Login', 'Profile' , "User-Manual"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <img  src={logo} alt="sheild" width={65}/>
          </Box>
        


          <Typography
            variant="h6"
            noWrap
            component="a"
            color='primary'
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
          PassProtekt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
            color='primary'
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            
            >
              <img  src={logo} alt="sheild" width={50}/>
         
            </IconButton>

            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>{
                  handleCloseNavMenu()
                  if (page === "User-Manual") {
                    // Trigger file download
                    const link = document.createElement("a");
                    link.href = "/PassProtekt-user-manual.pdf"; // Ensure the PDF is in the `public` folder
                    link.download = "PassProtekt-user-manual.pdf"; // Suggested filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    navigate(`/user/${page}`);
                  }
                }}

              >
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


         


          <Typography
            variant="h5"
            noWrap
            component="a"
            color='primary'
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              paddingRight :5,
              letterSpacing: '.4rem',
              textDecoration: 'none',
            }}
          >
            PassProtekt
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{
                 
                  if (page === "User-Manual") {
                    const link = document.createElement("a");
                    link.href = "/PassProtekt-user-manual.pdf";
                    link.download = "PassProtekt-user-manual.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    navigate(`/user/${page}`);
                  }
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>


       
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
