import React from 'react';
import Image from 'next/image';
import capebgimg from '../../Assets/Coffee Cup Background Youtube Thumbnail.png';

function Home() {
    return (
        <div className="relative w-full h-[620px] pt-20">
            {/* Background Image */}
            <Image
                src={capebgimg}
                alt="Cape Caffe Background"
                fill
                priority
                className="object-cover"
            />

            {/* See-through overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            />

            {/* Optional content on top */}
            <div className="absolute inset-0 flex items-center justify-center z-20 text-white px-6 text-center">
                <div className="max-w-4xl p-8 rounded-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Cape Caffe</h1>
                    <p className="text-base md:text-lg leading-relaxed ">
                        Where every sip tells a story. Nestled in the heart of the community, Cape Caffe is your cozy escape for rich,
                        handcrafted coffee, warm ambiance, and friendly smiles. From ethically sourced beans brewed to perfection,
                        to fresh pastries and delightful snacks, we bring you comfort in every cup. Whether you&apos;re catching up with friends,
                        working on your next big idea, or simply savoring a quiet moment — Cape Caffe is more than just a coffee shop,
                        it&apos;s your everyday retreat. Come in, relax, and let the aroma of Cape Caffe brighten your day.
                    </p>
                    <div className=" flex-col gap-10">
                        <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-3xl hover:bg-pink-700 transition">Shop Now</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
