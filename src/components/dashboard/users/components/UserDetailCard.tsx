'use client'
import { AtSignIcon, ChevronLeftIcon, CircleDotIcon, HashIcon, MailIcon, SaveIcon, ShieldIcon, UserIcon } from "lucide-react";
import DetailRow from "./DetailRow";
import { UsersResource } from "@/types/users";
import { useState } from "react";
import { API_ENDPOINT } from "@/config/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
    user: UsersResource
    id: number
}

export default function UserDetailCard({ user, id }: Props) {
    const router = useRouter()
    const [status, setStatus] = useState(user?.status || '');
    const [isUpdating, setIsUpdating] = useState(false);

    // Safe fallbacks for user data
    const userName = user?.name || 'Unknown';
    const userInitial = userName.charAt(0).toUpperCase();
    const userEmail = user?.email || 'No email provided';
    const userUsername = user?.username ? `@${user.username}` : 'No username';
    const userRole = user?.role || 'Unknown role';
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const getStatusStyle = (status: string = '') => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "inactive":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "banned":
                return "bg-rose-50 text-rose-700 border-rose-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const handleUpdate = async () => {
        try {
            setIsUpdating(true);
            const response = await fetch(`${API_ENDPOINT.users}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
                credentials:"include"
            });

            if (!response.ok) {
                throw new Error('Failed to update user status');
            }
            router.refresh();
        } catch (error) {
            console.error('Update error:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
                <p className="text-gray-500">Detailed information about the user</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                            {userInitial}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
                            <p className="text-gray-500">{userRole}</p>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    <DetailRow
                        icon={<HashIcon size={18} className="text-indigo-500" />}
                        label="ID"
                        value={user?.id || 'N/A'}
                    />
                    <DetailRow
                        icon={<UserIcon size={18} className="text-indigo-500" />}
                        label="Name"
                        value={userName}
                    />
                    <DetailRow
                        icon={<MailIcon size={18} className="text-indigo-500" />}
                        label="Email"
                        value={
                            <a href={`mailto:${userEmail}`} className="text-indigo-600 hover:underline">
                                {userEmail}
                            </a>
                        }
                    />
                    <DetailRow
                        icon={<AtSignIcon size={18} className="text-indigo-500" />}
                        label="Username"
                        value={userUsername}
                    />
                    <DetailRow
                        icon={<ShieldIcon size={18} className="text-indigo-500" />}
                        label="Role"
                        value={
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {userRole}
                            </span>
                        }
                    />
                    <DetailRow
                        icon={<CircleDotIcon size={18} className="text-indigo-500" />}
                        label="Status"
                        value={
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className={`block w-full pl-3 pr-10 py-2 text-base border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 ${getStatusStyle(status)}`}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="banned">Banned</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <Link
                    href="/dashboard/users"
                    className="flex items-center px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeftIcon size={18} className="mr-2" />
                    Back to Users
                </Link>
                <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className={`flex items-center px-6 py-2.5 rounded-lg ${isUpdating ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors shadow-sm`}
                >
                    {isUpdating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </>
                    ) : (
                        <>
                            <SaveIcon size={16} className="mr-2" />
                            Update Status
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}