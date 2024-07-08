"use client"
import React from 'react';

const TopNavbar = () => {
    return (
        <div className=' bg-gray-200 w-full h-12'>
            <div className='mx-auto max-w-7xl flex justify-between'>
                <div className="flex gap-4">
                    <a href="/">Home</a>
                    <select name="language" id="language">
                        <option value="en">English</option>
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
                    <a href="/">Login</a>
                    <a href="/auth/register">Register</a>
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;