import React from 'react';
import Image from 'next/image';

const ExpressTrack = () => {
    return (
        <div className="container mx-auto max-w-7xl  my-8 p-4 flex flex-wrap">
            {/* Express Track Section */}
            <div className="w-full lg:w-1/4 p-4 border-gray-300">
                <h2 className="text-xl font-bold mb-4">Express Track</h2>
                <textarea
                    className="w-full h-32 p-2 border rounded mb-4"
                    placeholder="Enter tracking details"
                ></textarea>
                <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Inquiry
                </button>
            </div>

            {/* Why choose Sosep Express? Section */}
            <div className="w-full lg:w-2/4 p-4 border-gray-300">
                <h2 className="text-xl font-bold mb-4">Why choose Sosep Express?</h2>
                <p className="mb-4 p-2">
                    <p>
                        At Sosep Express, we prioritize fast, reliable air transport thanks to our strong airline partnerships. We`&apos;`ve rapidly expanded to 23 branches across Africa, demonstrating our commitment to the region. We are dedicated to efficiency and quality, ensuring our services meet the specific needs of our customers. Our specialties include Air Express International, International Air Transport, and management of complex International Logistics Projects.
                    </p>
                    <br />
                    <p>
                        Choose Sosep Express for superior air transport and logistics solutions tailored to your requirements. Contact us to see how we can support your logistics goals efficiently and reliably.
                    </p>
                </p>
                <div className="mb-4">
                    <div className="flex items-start mb-2">
                        <div className="mr-2">
                            <Image src="/speed.png" width={24} height={24} alt="Speed Icon" />
                        </div>
                        <div>
                            <h3 className="font-bold">Speed</h3>
                            <p className="text-sm">Unbeatable Service time, Sosep Express is the fastest solution from China to Africa & South America.</p>
                        </div>
                    </div>
                    <div className="flex items-start mb-2">
                        <div className="mr-2">
                            <Image src="/flexibility.png" width={24} height={24} alt="Flexibility Icon" />
                        </div>
                        <div>
                            <h3 className="font-bold">Flexibility</h3>
                            <p className="text-sm">Sosep Express offers a flexible, first class delivery service that is tailored to your individual customer needs.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="mr-2">
                            <Image src="/reliability.png" width={24} height={24} alt="Reliability Icon" />
                        </div>
                        <div>
                            <h3 className="font-bold">Reliability</h3>
                            <p className="text-sm">Track your shipments on our state of the art tracking system and get real-time tracking information or contact our customer services.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Codes Section */}
            <div className="w-full lg:w-1/4 p-4">
                <div className="flex flex-col items-center mb-4">
                    <Image src="/qr-code.png" width={100} height={100} alt="WeChat QR Code" />
                    <p className="text-center text-sm">Follow us on WeChat</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/qr-code.png" width={100} height={100} alt="Weibo QR Code" />
                    <p className="text-center text-sm">Follow us on Weibo</p>
                </div>
            </div>
        </div>
    );
};

export default ExpressTrack;
