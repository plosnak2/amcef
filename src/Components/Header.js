import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/amcef_logo_final.png'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header(props) {
    const location = useLocation();

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign:"left" }}
            >
            <img src={logo} alt="Logo" height={60}/>
            </Typography>
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
            <Link style={{ textDecoration:"none" }} to="/"><Typography component="div"sx={{ fontWeight:"bold", fontFamily: "Comic Sans MS", fontSize:30, color: "white", position:"absolute", left:"50%", msTransform:"translate(-50%, -50%)", transform:"translate(-50%, -50%)" }}>TODO LIST</Typography></Link>
          
            </Typography>

            {
              // rendering searchbar depending on which subpage i am currently on (either filtering lists or items)
              location.pathname === "/" 
              ?
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Filtrovať zoznamy"
                  inputProps={{ 'aria-label': 'search' }}
                  value={props.search}
                  onChange={(e) => props.setSearch(e.target.value)}
                />
              </Search> 
            :
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Filtrovať položky"
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchItem}
                onChange={(e) => props.setSearchItem(e.target.value)}
              />
            </Search>
            }
            
          </Toolbar>
        </AppBar>
      </Box>
    );
}
