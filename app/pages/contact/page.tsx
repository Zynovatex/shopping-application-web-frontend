"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        newsletter: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Form submitted successfully!");
    };

    return (
        <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-16 bg-white">
            {/* Left: Contact Form */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-4xl font-bold">
                    Get In <span className="text-blue-700">Touch</span>
                </h2>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="E-mail" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <textarea 
                        name="message" 
                        placeholder="Message" 
                        rows={4} 
                        value={formData.message} 
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            name="newsletter" 
                            checked={formData.newsletter} 
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <label className="text-gray-700">I would like to receive the newsletter</label>
                    </div>

                    <button 
                     type="submit" 
                     className="px-4 py-1 border border-blue-700 text-blue-700 font-semibold rounded-md hover:bg-blue-200 transition">
                      Submit
                    </button>

                    </form>
            </div>

            {/* Right: Illustration */}
            <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
                <Image 
                    src="/contactUs.jpg" 
                    alt="Contact Illustration" 
                    width={500} 
                    height={400} 
                    className="w-full max-w-md"
                />
            </div>
        </section>
    );
}
