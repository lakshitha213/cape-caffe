import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-white py-12 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-800">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-brown-800">
                    About Us
                </h1>
                <p className="text-base md:text-lg leading-relaxed tracking-wide text-gray-700">
                    <span className="block mb-4">
                        Welcome to <span className="font-semibold text-brown-700">Cape Caffe</span>, where every cup tells a story.
                    </span>

                    <span className="block mb-4">
                        Nestled in the heart of <span className="font-semibold">Weeraketiya</span>, Cape Caffe is more than just a coffee shop—it&apos;s a place where passion meets flavor, and community comes to life. Whether you&apos;re looking for your daily caffeine fix, a relaxing spot to unwind, or a cozy corner to connect with friends, Cape Caffe is your go-to destination.
                    </span>

                    <span className="block mb-4">
                        We proudly serve a curated selection of premium coffees, handcrafted beverages, and fresh pastries, all made with love and care. Our beans are ethically sourced from the finest growers around the world, roasted to perfection, and brewed to bring out the boldest and most beautiful flavors.
                    </span>

                    <span className="block mb-4">
                        At Cape Caffe, we believe in quality, comfort, and connection. From the warm ambiance to our friendly baristas, every detail is designed to give you a memorable experience.
                    </span>

                    <span className="block font-medium italic mt-6">
                        Come in. Sit back. Sip slowly.<br />
                        Welcome to the Cape Caffe family.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
