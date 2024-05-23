import React, {useState} from 'react';
import styled from "styled-components"
//import { treeFirstLoad, ITreeComment } from '../other/userSlice'
import { useAppSelector } from '../other/hooks'
import CredditLogo from "../small-components/CredditLogo/CredditLogo";
import SearchBar from "../small-components/SearchBar/SarchBar";
import Button from '@mui/material/Button';
import ModalLogin from '../large-components/modal-windows/ModalLogin';
import ModalRegister from '../large-components/modal-windows/ModalRegister';
function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const isLogged = useAppSelector((state) => state.user.isLoggedIn);
    return (
        <StyledHeader>
          <StyledNav>
            <CredditLogo />
            <StyledRightBox>
              <SearchBar />
            </StyledRightBox>
            <StyledRightBox>
              <Button color="warning" variant="contained" onClick={() => setShowLoginModal(true)}>
                Log In
              </Button> 
              <Button color="warning" variant="contained" onClick={() => setShowRegisterModal(true)}>
                Register
              </Button> 
              <ModalLogin open={showLoginModal} close={() => {setShowLoginModal(false)}} />
              <ModalRegister open={showRegisterModal} close={() => {setShowRegisterModal(false)}} />
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