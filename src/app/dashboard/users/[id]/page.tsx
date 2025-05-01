
import UserDetail from "@/components/dashboard/users/UserDetail";
import { fetchUserByUsername } from "@/lib/services/userService";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
  description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
};

export default async function UserDetailPage() {
 
  const user = await fetchUserByUsername();
  return <UserDetail user={user} />;
}
