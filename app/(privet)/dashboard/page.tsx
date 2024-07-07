import React from 'react';
import Sidebar from './(component)/Sidebar';
import Navbar from './(component)/Navbar';

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <Navbar />
            <Sidebar />
        </div>
    );
};

export default Dashboard;
