// api/profileApi.ts
import axios from "axios";
import { storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BASE_URL } from "@/config/baseUrl";

interface ProfileData {
  name: string;
  email: string;
  profilePictureUrl?: string;
}

// Upload image file to Firebase Storage and get URL
export async function uploadProfilePicture(file: File): Promise<string> {
  if (!file) throw new Error("No file provided");

  const storageRef = ref(
    storage,
    `buyerProfileImages/${Date.now()}_${file.name}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

// Send profile data (including image URL) to backend
export async function updateProfile(data: ProfileData) {
  // Make sure this runs only in client environment:
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken") ?? "";
  }

  const response = await axios.put(`${BASE_URL}/user/profile`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export interface DisplayProfileData {
  name: string;
  email: string;
  profilePictureUrl?: string;
  updatedAt?: string;
  // add other fields as needed
}

/**
 * Fetch user profile data from backend
 * @param token JWT auth token for Authorization header
 */
export async function getUserProfile(token: string): Promise<ProfileData> {
  const response = await axios.get(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchUserProfile(token: string) {
  const response = await axios.get(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // expecting object with profilePictureUrl (and other info)
}
