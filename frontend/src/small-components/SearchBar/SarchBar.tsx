import { useState } from 'react';
import styled from 'styled-components';
import Magnifier from "small-components/SearchBar/Magnifier";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <Styleddiv>
            <Magnifier />
            <Styledinput value = { searchQuery }
                         onChange={(e) => {setSearchQuery(e.target.value)}}
                         placeholder="Search"
            />
        </Styleddiv>
    );
}

const Styleddiv = styled.div`
    background-color: #49270c;
    border-radius: 200px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: aqua;
`;

const Styledinput = styled.input`
    border-style: none;
    color: white;
    position: relative;
    top: -5px;
    width: 500px;
    background-color: inherit;
    font-size: 20px;
    &:focus {
        outline: none;
    }
`;

export default SearchBar;
