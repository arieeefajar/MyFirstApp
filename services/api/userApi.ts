import type { CreatePostInput, Post, User } from "@/types/api";
import apiClient from "./client";

// `signal` dipakai untuk membatalkan request yang sudah tidak dibutuhkan,
// misalnya saat kata kunci pencarian berubah atau screen ditinggalkan.
export const getUsers = (signal?: AbortSignal) =>
  apiClient.get<User[]>("/users", { signal });

export const getUserById = (id: number) =>
  apiClient.get<User>(`/users/${id}`);

export const createPost = (data: CreatePostInput) =>
  apiClient.post<Post>("/posts", data);
