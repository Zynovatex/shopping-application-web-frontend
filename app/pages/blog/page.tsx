"use client";

import { useState } from "react";
import Image from "next/image";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  description: string;
  extraDetails?: string[];
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
    description:
      "Master grocery shopping with these proven strategies to save time and money while shopping online.",
    extraDetails: [
      "Learn how to plan your meals, make a shopping list, buy in bulk, and avoid impulse purchases to get the most out of your grocery budget and save time.",
      "Consider shopping during off-peak hours to avoid crowds and make your trip faster.",
      "Use digital coupons and cashback apps for additional savings on your purchases.",
    ],
  },
  {
    id: 2,
    title: "Top 5 Fashion Trends You Shouldn't Miss",
    slug: "fashion-trends-2025",
    image: "/blogBanner/blogbanner2.png",
    category: "Fashion",
    date: "2025-04-20",
    description:
      "Get ahead of the fashion curve with this year's hottest online style picks and trend insights.",
    extraDetails: [
      "This year’s fashion trends include bold colors, sustainable fabrics, vintage styles making a comeback, and statement accessories to elevate your wardrobe.",
      "Explore mix-and-match techniques to create versatile looks from a limited wardrobe.",
      "Invest in timeless pieces that blend with trendy items for a balanced style.",
    ],
  },
  {
    id: 3,
    title: "Best Budget Tech Gadgets on Virtual City",
    slug: "budget-tech-gadgets",
    image: "/blogBanner/blogbanner3.png",
    category: "Tech",
    date: "2025-03-15",
    description:
      "Explore affordable gadgets that make life easier — from smartwatches to wireless earbuds and more.",
    extraDetails: [
      "Our top picks include budget smartwatches with fitness tracking, noise-cancelling earbuds under $50, and portable chargers with fast charging capabilities.",
      "Check product reviews and warranties before purchase.",
    ],
  },
  {
    id: 4,
    title: "Save More with These Daily Deals",
    slug: "daily-deals",
    image: "/blogBanner/blogbanner4.jpg",
    category: "Deals",
    date: "2025-03-10",
    description:
      "Take advantage of the latest discounts, bundles, and flash sales happening right now.",
    extraDetails: [
      "Check back daily for limited-time flash sales, bundle offers, and clearance discounts across all categories including electronics, groceries, and fashion.",
      "Subscribe to newsletters for exclusive deals sent directly to your inbox.",
    ],
  },
  {
    id: 5,
    title: "Why Supporting Local Grocery Sellers Matters",
    slug: "support-local-sellers",
    image: "/blogBanner/blogbanner5.png",
    category: "Shopping Tips",
    date: "2025-02-27",
    description:
      "Learn how buying from local sellers helps the community and promotes sustainability.",
    extraDetails: [
      "Supporting local sellers strengthens the community economy, reduces carbon footprint, encourages sustainable farming practices, and keeps traditions alive.",
      "Local sellers often provide fresher and higher-quality products.",
    ],
  },
  {
    id: 6,
    title: "Empowering Communities: The Impact of Buying Local Groceries",
    slug: "empowering-communities-local-groceries",
    image: "/blogBanner/blogbanner6.png",
    category: "Shopping Tips",
    date: "2025-02-27",
    description:
      "Discover how purchasing groceries from local sellers strengthens communities, supports sustainable farming, and reduces environmental impact.",
    extraDetails: [
      "By choosing local groceries, you invest in your neighbors’ businesses, promote organic and traditional farming, and reduce transportation emissions.",
      "It fosters community connections and awareness about food sources.",
    ],
  },
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

  const featuredPost = blogPosts[0];
  const isFeaturedExpanded = expandedPosts.has(featuredPost.id);

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
                ? "bg-blue-700 text-white"
                : "bg-white text-blue-700 border-blue-700 hover:bg-blue-100"
            } transition`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16 mt-10">
        {filteredPosts.map((post) => {
          const isExpanded = expandedPosts.has(post.id);
          return (
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
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toDateString()}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 mt-1">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {post.description}
                </p>

                {isExpanded && post.extraDetails && (
                  <div className="mt-4 space-y-3 text-sm text-gray-700 whitespace-pre-line">
                    {post.extraDetails.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => toggleExpand(post.id)}
                  className="mt-4 text-blue-600 hover:underline font-medium"
                >
                  {isExpanded ? "Show Less ←" : "Read More →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Blog Post */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden cursor-pointer hover:shadow-2xl transition">
          <div className="relative md:w-1/2 h-64 md:h-auto">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
            <p className={`text-gray-700 mb-6 ${!isFeaturedExpanded ? "line-clamp-3" : ""}`}>
              {featuredPost.description}
            </p>

            {isFeaturedExpanded && featuredPost.extraDetails && (
              <div className="mb-6 space-y-3 text-gray-700 whitespace-pre-line text-sm">
                {featuredPost.extraDetails.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            )}

            <button
              onClick={() => toggleExpand(featuredPost.id)}
              className="self-start bg-blue-700 text-white px-5 py-3 rounded hover:bg-blue-800 transition"
            >
              {isFeaturedExpanded ? "Show Less ←" : "Read More →"}
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No blog posts in this category yet.
        </p>
      )}
    </div>
  );
};

export default BlogPage;
