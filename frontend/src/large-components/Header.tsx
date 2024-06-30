import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import { useAppSelector, useAppDispatch } from 'other/hooks'
import { setColorModeDark, setColorModeLight, setLoggedIn, setLoggedOut, setUsername, setProfilepicture } from 'other/slices/userSlice';
import ModalLogin from 'large-components/modal-windows/ModalLogin';
import ModalRegister from 'large-components/modal-windows/ModalRegister';
import CredditLogo from "small-components/CredditLogo/CredditLogo";
import SearchBar from "small-components/SearchBar/SarchBar";
import {deleteCookie, getCookie} from "other/widelyUsedFunctions";
import {Avatar, IconButton, Menu, MenuItem, Switch, Button, Badge} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GavelIcon from '@mui/icons-material/Gavel';
import axios from "axios";

function Header() {
    const selectorColorTheme = useAppSelector((state) => state.user.colorMode);
    const dispatch = useAppDispatch();
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
    const [colorModeState, setColorModeState] = useState(selectorColorTheme == "dark" ? false : true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [headerAuth, setHeaderAuth] = useState<boolean>(false);
    const open: boolean = Boolean(anchorEl);
    const userInfoSmallInit: IUserInfoSmall = {id: 0, name: "default", profilePictureUrl: "default", notCheckedNotificationAmount: 0};
    const [userHeaderSmallInfoState, setUserHeaderSmallInfoState] = useState<IUserInfoSmall>(userInfoSmallInit);
    interface IUserInfoSmall { id: number, name: string, profilePictureUrl: string, notCheckedNotificationAmount: number }
    useEffect((): void=> {
        const tokenSendingHeader : {headers : {Authorization : string}} = {
            headers : {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url : string = "/api/usersmall";
        axios.get(url, tokenSendingHeader)
            .then(
                (response): void => {
                    const payload : IUserInfoSmall = {
                        id: response.data.id,
                        name: response.data.username,
                        profilePictureUrl: response.data.profilePictureUrl,
                        notCheckedNotificationAmount: response.data.notCheckedNotificationAmount,
                    };
                    dispatch(setUsername(response.data.username));
                    dispatch(setProfilepicture(response.data.profilePictureUrl));
                    setUserHeaderSmallInfoState(payload);
                    setHeaderAuth(true);
                }
            )
            .catch( () => setHeaderAuth(false)
        );
    }, []);
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
      setAnchorEl(null);
    };
    function switchColorModeHandler(): void {
     setColorModeState((state) => {
        if (state)
        dispatch(setColorModeDark());
        else
        dispatch(setColorModeLight());
        return !state;
      })   
    } 
    function logOutHandler() : void {
      handleClose();
      deleteCookie("token");
      dispatch(setLoggedOut());
      document.location.href="/";
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
              {headerAuth && "user"}
              {!headerAuth && "guest"}
              {
              !headerAuth &&
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
                headerAuth &&
                <>
                  <IconButton href="/c/darksouls/moderator">
                    <GavelIcon />
                  </IconButton>
                  <IconButton href="/admin">
                    <AdminPanelSettingsIcon />
                  </IconButton>
                  <IconButton>
                      <Badge badgeContent={userHeaderSmallInfoState.notCheckedNotificationAmount} color="primary">
                        <NotificationsNoneIcon />
                      </Badge>
                  </IconButton>
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
                    <MenuItem onClick={(): void => {document.location.href=`/user/${userHeaderSmallInfoState.id}`}}>
                      {
                          userHeaderSmallInfoState.profilePictureUrl == "default" &&
                          <Avatar sx={{height: 32, width: 32, mr: 1}} />
                      }
                      {
                          userHeaderSmallInfoState.profilePictureUrl != "default" &&
                          <Avatar sx={{height: 32, width: 32, mr: 1}} src={userHeaderSmallInfoState.profilePictureUrl}/>
                      }
                      <span>
                        {userHeaderSmallInfoState.name}
                      </span>
                    </MenuItem>
                    <MenuItem onClick={() => {document.location.href = "/settings"} }>
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