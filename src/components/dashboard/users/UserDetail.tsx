
import { UsersResource } from "@/types/users";
import { API_ENDPOINT } from "@/config/api";
import Sidebar from "../components/layout/navigations/components/SideBar";
import Header from "../components/layout/navigations/components/Header";
import UserDetailCard from "./components/UserDetailCard";

export async function getUser(id: number): Promise<UsersResource> {
  try {
    const res = await fetch(`${API_ENDPOINT.users}/${id}`, {
      cache: "no-store",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(`Server error: ${result.message || 'Unknown error'}`);
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}



type Props = {
  id: string;
};

export async function UserDetail({ id }: Props) {
  const user = await getUser(parseInt(id));
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80">
        <Header />
        <main className="flex-1 p-6">
         <UserDetailCard user={user} id={user.id}/>
        </main>
      </div>
    </div>
  );
};
export default UserDetail;