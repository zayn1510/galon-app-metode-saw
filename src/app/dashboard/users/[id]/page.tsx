import Header from "@/components/dashboard/components/layout/navigations/components/Header";
import Sidebar from "@/components/dashboard/components/layout/navigations/components/SideBar";
import UserDetailCard from "@/components/dashboard/users/components/UserDetailCard";
import UserDetail from "@/components/dashboard/users/UserDetail";
import { API_ENDPOINT } from "@/config/api";
import { UsersResource } from "@/types/users";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
  description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
};


export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params; // ✅ Sesuai update Next.js
 
  return (
    <UserDetail id={id} />
  );
}