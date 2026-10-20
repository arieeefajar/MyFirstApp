import type { CreatePostInput, Post, User } from "@/types/api";
import apiClient from "./client";

export const getUsers = () => apiClient.get<User[]>("/users");

export const getUserById = (id: number) =>
  apiClient.get<User>(`/users/${id}`);

export const createPost = (data: CreatePostInput) =>
  apiClient.post<Post>("/posts", data);
