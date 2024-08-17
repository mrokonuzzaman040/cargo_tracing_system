"use client";
import React from 'react';
import Image from 'next/image';

const Logout = () => {
    // call the logout function
    const logout = async () => {
        // make a request to the server to logout the user
        const response = await fetch('/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // check if the request was successful
        if (response.ok) {
            // redirect the user to the login page
            window.location.href = '/';
        }
    };
    return (
        <div>
            <button onClick={logout} className="btn btn-primary hover:text-blue-800 text-white">
                <Image src="/logout.svg" width={20} height={20} alt="Logout" />
            </button>
        </div>
    );
};

export default Logout;