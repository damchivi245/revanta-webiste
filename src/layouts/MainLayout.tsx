import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  // const { user, token, fetchUser } = useAuthStore();

  // useEffect(() => {
  //   if (token && !user) {
  //     fetchUser();
  //   }
  // }, [token, user, fetchUser]);

  // if (!token) return <Navigate to="/login" />; // Chuyển hướng nếu chưa đăng nhập

  return (
    <div className="relative size-full">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
