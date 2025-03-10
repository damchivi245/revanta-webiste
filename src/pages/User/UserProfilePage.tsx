import { BackgroundLines } from "@/components/backgrounds/background-lines";
import { ProfileSkeleton } from "@/components/SkeletonComponent";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { id } = useParams();
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  console.log("user", user);
  useEffect(() => {
    if (user && user.data.id !== id) {
      navigate(`/user/${user.data.id}`, { replace: false });
    }
  }, [user, id, navigate]);
  return loading ? (
    <div>
      <ProfileSkeleton />
    </div>
  ) : (
    <BackgroundLines className="text-white bg-black pt-28">
      <div className="container mx-auto">
        {user ? <div>{user.data.email}</div> : <div> No Data</div>}
      </div>
    </BackgroundLines>
  );
};

export default UserProfilePage;
