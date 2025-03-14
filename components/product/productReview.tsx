"use client";

import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const ProductReview = () => {
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: "★★★★★",
      review:
        "Great quality hoodie! The material is soft and comfortable, and the design looks amazing. Highly recommended!",
      liked: false,
      likes: 0,
    },
    {
      name: "Jane Smith",
      rating: "★★★★☆",
      review:
        "Nice hoodie, but the size runs a bit large. Overall, very satisfied with the purchase!",
      liked: false,
      likes: 0,
    },
    {
      name: "Michael Brown",
      rating: "★★★★★",
      review:
        "Absolutely love this hoodie! Perfect for casual wear and super stylish.",
      liked: false,
      likes: 0,
    },
  ]);

  const handleLike = (index: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review, i) => {
        if (i === index) {
          return {
            ...review,
            liked: !review.liked,
            likes: !review.liked ? review.likes + 1 : review.likes - 1,
          };
        }
        return review;
      })
    );
  };

  return (
    <div className="mt-6 space-y-6">
      {reviews.map((review, index) => (
        <div key={index} className="border p-4 rounded-md shadow-md">
          <p className="font-semibold">{review.name}</p>
          <p className="text-yellow-500">{review.rating}</p>
          <p className="text-gray-700">{review.review}</p>
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => handleLike(index)}
              className={`flex items-center space-x-1 ${
                review.liked ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {review.liked ? (
                <AiFillLike className="w-5 h-5" />
              ) : (
                <AiOutlineLike className="w-5 h-5" />
              )}
            </button>
            <span className="text-gray-600">Likes: {review.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReview;
