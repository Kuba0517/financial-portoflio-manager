import { getServerSession } from "next-auth";
import UserInfo from "@/app/profile/components/UserInfo";
import UserPortfolio from "@/app/profile/components/UserPortfolio";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserResponseDTO } from "@/dtos/user.dto";
import apiClient from "@/lib/apiClient";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    const { data: user }: { data: UserResponseDTO } = await apiClient.get(
        `/api/users?email=${session?.user?.email}`
    );

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="grid grid-cols-1 gap-6">
                <UserInfo user={user} />
                <UserPortfolio user={user} />
            </div>
        </div>
    );
}
