import React from "react"
import { useState, useEffect } from "react";


export default function SuggestedUsers() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users');
            const responseData = await response.json();
            console.log(responseData)
            setUsers(responseData.users, "users");
        }
        fetchData();
    }, []);

    return (
        <div id="suggested-user-container">
            <p>Suggestions For You </p>
        </div>

    )
}