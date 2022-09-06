import { useState, useEffect } from "react";
import {Link } from 'react-router-dom'
import classes from './search.module.css'


export default function Search() {

    const [search, setSearch] = useState([])
    const [users, setUsers] = useState([]);
    const [openSearchBox, setOpenSearchBar] = useState(false)
    const [inputVal, setInputVal] = useState('')
    let searchValues = [];

    const searchUsers = (e) => {
            setInputVal(e.target.value)
            searchValues = users.filter(user => {
                if(user.full_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.username.toLowerCase().includes(e.target.value.toLowerCase()) )
                return true
            })
            setSearch(searchValues)
            if(search && e.target.value) {
                setOpenSearchBar(true)
            }else {
                setOpenSearchBar(false)
            }
    }

    
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    const closeSearch = () => {
        setOpenSearchBar(false)
    }
    
    return (
        <div className={classes.search}>
            <svg aria-label="Search" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            <svg className={classes.svg2}  style={{fill: "#c7c6c7", position: "relative", left: "260px" }} xmlns="http://www.w3.org/2000/svg" onClick={() => {
                closeSearch()
                setInputVal('')
                }} width="12" height="12" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"/></svg>
            <input 
                onChange={searchUsers}
                type='text'
                placeholder="Search"
                value={inputVal}
            />
            {openSearchBox && (
                <div className={classes.searchContainer}> 
                    {search && search.map(user => (
                    <Link to={`/users/${user.id}`} key={user.id} onClick={() => {
                        setOpenSearchBar(false)
                        setInputVal('')
                    }}>
                        <div className={classes.userContainer} key={user.id}>
                            <div className={classes.searchUserImg}> 
                                <img src={user.profile_pic} alt='user' />
                            </div>
                            <div className={classes.userNames}>
                                <span classeName={classes.username}>{user.username}</span>
                                <span classeName={classes.fullName}>{user.full_name}</span>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            )}
        </div>
    )
}