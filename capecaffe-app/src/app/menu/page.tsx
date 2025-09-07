"use client";

import ContactUs from "@/ContactUs/ContactUs";
import Navbar from "@/Navigation bar/Navbar";
import React from "react";

const coffeeItems = [
	{
		id: 1,
		name: "Espresso",
		description: "Strong and bold, our signature espresso shot",
		price: 3.5,
		image: "/Assets/Untitled.jpeg",
		category: "Hot Coffee",
	},
	{
		id: 2,
		name: "Cappuccino",
		description: "Perfect balance of espresso, steamed milk, and foam",
		price: 4.75,
		image: "/Assets/Untitled1.jpeg",
		category: "Hot Coffee",
	},
	{
		id: 3,
		name: "Latte",
		description: "Smooth espresso with steamed milk and a light layer of foam",
		price: 4.95,
		image: "/Assets/Untitled2.jpeg",
		category: "Hot Coffee",
	},
	{
		id: 4,
		name: "Iced Coffee",
		description: "Chilled coffee served with ice and your choice of milk",
		price: 4.25,
		image: "/coffee/iced-coffee.jpg",
		category: "Cold Coffee",
	},
	{
		id: 5,
		name: "Caramel Macchiato",
		description: "Vanilla syrup, steamed milk, espresso and caramel drizzle",
		price: 5.25,
		image: "/coffee/caramel-macchiato.jpg",
		category: "Specialty Drinks",
	},
	{
		id: 6,
		name: "Mocha",
		description: "Espresso with chocolate syrup and steamed milk",
		price: 5.15,
		image: "/coffee/mocha.jpg",
		category: "Specialty Drinks",
	},
	{
		id: 7,
		name: "Cold Brew",
		description: "Slow-steeped for 16 hours for a smooth, rich flavor",
		price: 4.95,
		image: "/coffee/cold-brew.jpg",
		category: "Cold Coffee",
	},
	{
		id: 8,
		name: "Americano",
		description: "Espresso shots topped with hot water",
		price: 3.75,
		image: "/coffee/americano.jpg",
		category: "Hot Coffee",
	},
];

export default function Page() {
	const categorizedItems = coffeeItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [] as typeof coffeeItems;
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<string, typeof coffeeItems>);

	return (
		<div>
			<Navbar />
			<div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-amber-900 mb-2">Our Menu</h1>
					<p className="text-amber-700 max-w-2xl mx-auto">
						Discover our handcrafted coffee selections made with premium beans sourced from sustainable farms around the world.
					</p>
				</div>

				{Object.entries(categorizedItems).map(([category, items]) => (
					<div key={category} className="mb-16">
						<h2 className="text-2xl font-semibold text-amber-800 border-b-2 border-amber-300 pb-2 mb-6">
							{category}
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{items.map((item) => (
								<div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
									<div className="flex">
										<div className="w-1/3 relative">
											<div className="w-full h-full bg-amber-200 flex items-center justify-center">
												<span className="text-amber-700 text-sm">Coffee Image</span>
											</div>
										</div>

										<div className="w-2/3 p-4">
											<div className="flex justify-between items-start">
												<h3 className="text-lg font-semibold text-amber-900">{item.name}</h3>
												<span className="text-amber-700 font-bold">${item.price.toFixed(2)}</span>
											</div>
											<p className="text-amber-600 text-sm mt-2">{item.description}</p>
											<button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition">
												Add to Order
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}

				<div className="bg-amber-100 rounded-xl p-6 text-center mt-12">
					<h2 className="text-2xl font-bold text-amber-900 mb-2">Daily Special</h2>
					<p className="text-amber-700 mb-4">
						Try our featured drink of the day: <span className="font-semibold">Hazelnut Latte</span> - 20% off!
					</p>
					<button className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition">
						View Today&apos;s Specials
					</button>
				</div>
			</div>
			<ContactUs/>
		</div>
	);
} 