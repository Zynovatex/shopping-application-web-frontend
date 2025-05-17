"use client";

import { useState } from "react";
import Image from "next/image";

// Dummy blog post structure
type BlogPost = {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  description: string;
};

const allCategories = ["All", "Shopping Tips", "Fashion", "Tech", "Deals"];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Smart Grocery Shopping Tips for Busy People",
    slug: "grocery-tips",
    image: "/blogBanner/blogbanner1.png",
    category: "Shopping Tips",
    date: "2025-05-01",
    description: "Master grocery shopping with these proven strategies to save time and money while shopping online.",
  },
  {
    id: 2,
    title: "Top 5 Fashion Trends You Shouldn't Miss",
    slug: "fashion-trends-2025",
    image: "/blogBanner/blogbanner2.png",
    category: "Fashion",
    date: "2025-04-20",
    description: "Get ahead of the fashion curve with this year's hottest online style picks and trend insights.",
  },
  {
    id: 3,
    title: "Best Budget Tech Gadgets on Virtual City",
    slug: "budget-tech-gadgets",
    image: "/blogBanner/blogbanner3.png",
    category: "Tech",
    date: "2025-03-15",
    description: "Explore affordable gadgets that make life easier — from smartwatches to wireless earbuds and more.",
  },
  {
    id: 4,
    title: "Save More with These Daily Deals",
    slug: "daily-deals",
    image: "/blogBanner/blogbanner4.jpg",
    category: "Deals",
    date: "2025-03-10",
    description: "Take advantage of the latest discounts, bundles, and flash sales happening right now.",
  },
  {
    id: 5,
    title: "Why Supporting Local Grocery Sellers Matters",
    slug: "support-local-sellers",
    image: "/blogBanner/blogbanner5.png",
    category: "Shopping Tips",
    date: "2025-02-27",
    description: "Learn how buying from local sellers helps the community and promotes sustainability.",
  },
 {
  id: 6,
  title: "Empowering Communities: The Impact of Buying Local Groceries",
  slug: "empowering-communities-local-groceries",
  image: "/blogBanner/blogbanner6.png",
  category: "Shopping Tips",
  date: "2025-02-27",
  description: "Discover how purchasing groceries from local sellers strengthens communities, supports sustainable farming, and reduces environmental impact.",
}

];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px]">
        <Image
          src="/blogBanner/herobanner.png"
          alt="Blog Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center ">
            Explore Tips, Trends & Deals on Virtual City
          </h1>
        </div>
      </div>
      
      
      {/* Category Tabs */}
      <div className="flex justify-center gap-6 mt-10 mb-10 flex-wrap px-4">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-medium ${
              selectedCategory === cat
                ? "bg-blue-800 text-white"
                : "bg-white text-blue-800 border-blue-800 hover:bg-blue-100"
            } transition`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16 mt-10">
        {filteredPosts.map((post) => (
          <div
  key={post.id}
  className="bg-white rounded-lg shadow hover:shadow-2xl transition duration-500 hover:-translate-y-6"
>
  <div className="relative w-full h-96 rounded-t-lg overflow-hidden bg-gray-100">
    <Image
      src={post.image}
      alt={post.title}
      width={500}
      height={300}
      className="object-contain object-center rounded-t-lg bg-gray-100"
    />
  </div>

  <div className="p-4">
    <span className="text-sm text-gray-500">{new Date(post.date).toDateString()}</span>
    <h2 className="text-lg font-semibold text-gray-800 mt-1">{post.title}</h2>
    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.description}</p>
    <button className="mt-4 text-blue-600 hover:underline font-medium">
      Read More →
    </button>
  </div>
</div>

        ))}
      </div>
      {/* Featured Blog Post */}
<div className="max-w-7xl mx-auto px-6 md:px-16 mt-12">
  <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
  <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden cursor-pointer hover:shadow-2xl transition">
    <div className="relative md:w-1/2 h-64 md:h-auto">
      <Image
        src={blogPosts[0].image}
        alt={blogPosts[0].title}
        fill
        className="object-cover"
        priority
      />
    </div>
    <div className="p-6 md:w-1/2 flex flex-col justify-center">
      <h3 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h3>
      <p className="text-gray-700 mb-6">{blogPosts[0].description}</p>
      <button className="self-start bg-blue-700 text-white px-5 py-3 rounded hover:bg-blue-800 transition">
        Read More →
      </button>
    </div>
  </div>
</div>


      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">No blog posts in this category yet.</p>
      )}
    </div>
  );
};

export default BlogPage;
