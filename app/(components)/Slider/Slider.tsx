// app/(components)/Slider/Slider.tsx

import React from 'react';

const Slider = () => {
    return (
        <div className="relative w-full">
            {/* Slider */}
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                        className="w-full" alt="Slide 1" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                        className="w-full" alt="Slide 2" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                        className="w-full" alt="Slide 3" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                        className="w-full" alt="Slide 4" />
                </div>
            </div>

            {/* Login Form */}
            <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-70 w-1/4 h-full flex flex-col justify-center p-8">
                <h2 className="text-white text-2xl mb-6">Log In</h2>
                <form className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Email or phone"
                            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-right text-white mt-4">
                    <a href="#" className="text-sm">Forgot password?</a>
                    <br />
                    <a href="#" className="text-sm">Register</a>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </div>
    );
};

export default Slider;
