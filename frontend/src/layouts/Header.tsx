import React, {useState} from 'react';
import styled from "styled-components"
import { useAppSelector, useAppDispatch } from '../other/hooks'
import { setColorModeDark, setColorModeLight, setLoggedIn, setLoggedOut } from '../other/userSlice';
import CredditLogo from "../small-components/CredditLogo/CredditLogo";
import SearchBar from "../small-components/SearchBar/SarchBar";
import Button from '@mui/material/Button';
import ModalLogin from '../large-components/modal-windows/ModalLogin';
import ModalRegister from '../large-components/modal-windows/ModalRegister';
import { Avatar, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';


function Header() {
    const selectorColorTheme = useAppSelector((state) => state.user.colorMode);
    const selectorLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const dispatch = useAppDispatch();
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
    const [colorModeState, setColorModeState] = useState(selectorColorTheme == "dark" ? false : true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    function switchColorModeHandler() : void{
     setColorModeState((stite) => {
        if (stite)
        dispatch(setColorModeDark());
        else
        dispatch(setColorModeLight());
        return !stite;
      })   
    } 
    function logOutHandler() : void {
      handleClose();
      dispatch(setLoggedOut());
      //window.location.href = "/";
    }
    return (
        <StyledHeader>
          <StyledNav>
            <CredditLogo />
            <StyledRightBox>
              <SearchBar />
            </StyledRightBox>
            <StyledRightBox>
              {selectorColorTheme == "light" && "light"}
              {selectorColorTheme == "dark" && "dark"}
              {selectorLoggedIn && "user"}
              {!selectorLoggedIn && "guest"}
              {
              !selectorLoggedIn &&  
              <>
                <Button color="warning" variant="contained" onClick={() => setShowLoginModal(true)}>
                  Log In
                </Button> 
                <Button color="warning" variant="contained" onClick={() => setShowRegisterModal(true)}>
                  Register
                </Button> 
                <ModalLogin open={showLoginModal} close={() => {setShowLoginModal(false)}} />
                <ModalRegister open={showRegisterModal} close={() => {setShowRegisterModal(false)}} />
              </>
              }
              {
                selectorLoggedIn &&
                <>
                  <IconButton onClick={ handleClick }>
                    <Avatar sx={{width: 32, height: 32}} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={ open }
                    onClose={ handleClose }
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem>
                      <Avatar sx={{height: 32, width: 32, mr: 1}} />
                      <span>
                        Creddible1337
                      </span>
                    </MenuItem>
                    <MenuItem >
                      <SettingsIcon sx={{height: 32, width: 32, mr: 1}}/>
                      <span>
                        Settings
                      </span>
                    </MenuItem>
                    <MenuItem>
                      <DarkModeIcon sx={{height: 32, width: 32, mr: 1}} />
                      <span>
                        Dark Mode
                      </span>
                      <Switch
                        checked={!colorModeState}
                        onChange={switchColorModeHandler}
                      />
                    </MenuItem>
                    <MenuItem onClick={logOutHandler}>
                      <LogoutIcon sx={{height: 32, width: 32, mr: 1}}/>
                      <span>
                        Log Out
                      </span>
                    </MenuItem>
                  </Menu>
                </>
              }
              </StyledRightBox>
            </StyledNav>
          </StyledHeader>
      );
  }

const StyledHeader = styled.header`
    color: #aca9a9;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    border-style: solid;
    padding-top: 5px;
    padding-bottom: 5px;
`;
const StyledNav = styled.nav`
    display: flex; 
    align-items: center;
`;
const StyledRightBox = styled.div`
    padding-right: 20px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 10px;
`;
const StyledSearchBarBox = styled.div`
    margin-left: auto;
`;
export default Header;