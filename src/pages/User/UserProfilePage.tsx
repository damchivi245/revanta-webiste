// import { BackgroundLines } from "@/components/backgrounds/background-lines";
import { useUser } from "@/hooks/use-user";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { id } = useParams();
  console.log("Id:", id);
  const user = useUser();
  return <div>{user ? `Xin chào, ${user.firstName}` : "Đang tải..."}</div>;
};

export default UserProfilePage;
