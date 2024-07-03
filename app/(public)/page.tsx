import React from 'react';
import TopNavbar from '../(components)/TopNavbar/TopNavbar';
import Navbar from '../(components)/Navbar/Navbar';
import Slider from '../(components)/Slider/Slider';
import ExpressTrack from '../(components)/ExpressTrack/ExpressTrack';
import HowToBuy from '../(components)/HowToBuy/HowToBuy';
import Footer from '../(components)/Footer/Footer';

const page = () => {
    return (
        <div>
            <TopNavbar />
            <Navbar />
            <Slider />
            <ExpressTrack />
            <HowToBuy />
            <Footer />
        </div>
    );
};

export default page;