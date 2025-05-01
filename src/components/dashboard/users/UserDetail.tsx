
import { UsersResource } from "@/types/users";
import Sidebar from "../components/layout/navigations/components/SideBar";
import Header from "../components/layout/navigations/components/Header";
import UserDetailCard from "./components/UserDetailCard";
import { useParams } from "next/navigation";

type Props = {
  user:UsersResource
};

export async function UserDetail({ user }: Props) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80">
        <Header user={user} />
        <main className="flex-1 p-6">
         <UserDetailCard user={user} id={user.id}/>
        </main>
      </div>
    </div>
  );
};
export default UserDetail;