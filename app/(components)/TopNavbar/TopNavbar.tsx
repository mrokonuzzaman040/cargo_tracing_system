"use client"
import React from 'react';

const TopNavbar = () => {
    return (
        <div className='w-full bg-slate-300 h-8 grid-cols-3 grid p-1 justify-between gap-4'>
            <div className="flex gap-4">
                <a href="/">Home</a>
                <select name="language" id="language">
                    <option value="en"> English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="zh">Chinese</option>
                </select>
            </div>
            <div className="">
                
            </div>
            <div className="flex gap-4 justify-end">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            
        </div>
    );
};

export default TopNavbar;