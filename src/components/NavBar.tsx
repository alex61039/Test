import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom"
import useAction from "../hooks/useAction";
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const pages = [
    {name:"Главная", href:"/"},
    {name:"Контакты", href: "/Contacts"}
]

export default function NavBar() {

    const navigate = useNavigate();
    const auth = localStorage.getItem("auth")
    const {logout} = useAction()
    const clickLogout = () => {
        logout();
        setTimeout( () => {
            navigate("/")
        }, 500)
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
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
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({name, href}, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({name, href}, index) => (
                            <Button
                                key={index}
                                onClick={() => navigate(href)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {
                            localStorage.getItem("user")
                        }
                    </Typography>
                    {
                        auth === "true"
                            ?
                            <Button style={{border:"1px black solid"}} color="inherit" onClick={clickLogout}>Logout</Button>
                            :
                            <Button style={{border:"1px black solid"}} color="inherit" onClick={() => navigate("/Login")}>Login</Button>
                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
}



