import { BackgroundLines } from "@/components/backgrounds/background-lines";
import Order from "@/components/Order";
import { ProfileSkeleton } from "@/components/SkeletonComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { UpdateUser } from "@/types/types";
import {
  Camera,
  CrownIcon,
  LocateIcon,
  MailIcon,
  PhoneCallIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UserProfilePage = () => {
  const { id } = useParams();
  const { user, fetchUser } = useAuthStore();
  const { updateUser, updateUserImage, loading } = useUserStore();
  const [file, setFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState<UpdateUser>({
    firstName: user?.data?.firstName || "",
    lastName: user?.data?.lastName || "",
    address: user?.data?.address || "",
    phone: user?.data?.phone || "",
  });
  useEffect(() => {
    if (user?.data) {
      setForm({
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        address: user.data.address || "",
        phone: user.data.phone || "",
      });
    }
  }, [user]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data?.id && id && user.data.id !== id) {
      navigate(`/user/${user.data.id}`, { replace: false });
    }
  }, [user, id, navigate]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // Kiểm tra định dạng file
    if (!selectedFile.type.startsWith("image/")) {
      toast.warning("Please select image!");
      return;
    }

    setFile(selectedFile); // Cập nhật state để hiển thị ảnh tạm

    if (id) {
      try {
        await updateUserImage(id, selectedFile);
        fetchUser();
      } catch (error) {
        console.error("Lỗi khi cập nhật ảnh:", error);
      }
    }
  };

  const handleFormChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value || "", // Đảm bảo không fallback về user.data
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn reload trang
    try {
      if (id) {
        await updateUser(id, form);
        toast.success("User profile updated successfully!");
      } else {
        toast.error("User ID is missing.");
      }
      console.log("Submitting form:", form);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating user profile:", error);
    }
  };

  if (loading) {
    return (
      <BackgroundLines className="text-white bg-black pt-28 size-full">
        <ProfileSkeleton />
      </BackgroundLines>
    );
  }

  if (!user || !user.data) {
    return (
      <BackgroundLines className="text-white bg-black pt-28 size-full">
        <ProfileSkeleton />
      </BackgroundLines>
    );
  }

  return (
    <BackgroundLines className="text-white bg-black pt-28 size-full font-montserrat">
      <div className="mx-2 md:mx-20 my-0 space-y-2">
        <div className="relative p-6 overflow-hidden rounded-md bg-zinc-600/60 backdrop-blur-sm border border-zinc-500">
          <div className="absolute top-0 left-0 z-0 w-full h-[15%] md:h-[30%] bg-black">
            <div className="flex flex-wrap items-center justify-center h-full px-2 text-6xl text-white gap-2  md:text-8xl font-cinzel bg-clip-text">
              <p>Revanta</p>
              <p>Member</p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="relative mx-auto w-fit">
              <Avatar className="border-2 rounded-full size-40 border-zinc-400">
                <AvatarImage
                  src={file ? URL.createObjectURL(file) : user.data.image} // Hiển thị ảnh tạm
                  alt={user.data.email}
                  className="object-cover size-full"
                />
                <AvatarFallback className="flex items-center justify-center text-6xl bg-zinc-500/50 size-full">
                  {(
                    user?.data?.firstName?.[0] || user?.data?.email?.[0]
                  )?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="picture"
                className="absolute p-2 bg-gray-700 rounded-full cursor-pointer bottom-2 right-2"
              >
                <Camera />
              </label>
              <Input
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="col-span-2 w-full">
                <form className="space-y-2" action="" onSubmit={handleSubmit}>
                  <div className="text-3xl font-bold font-montserrat">
                    {editMode ? (
                      <div className="flex items-center gap-1">
                        <Input
                          name="lastName"
                          value={form.lastName}
                          placeholder="First name"
                          onChange={handleFormChange}
                          onBlur={() => setEditMode(false)} // Mất focus thì thoát chế độ chỉnh sửa
                          className="text-3xl font-bold"
                        />
                        <Input
                          name="firstName"
                          value={form.firstName}
                          placeholder="First name"
                          onChange={handleFormChange}
                          onBlur={() => setEditMode(false)} // Mất focus thì thoát chế độ chỉnh sửa
                          className="text-3xl font-bold"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setEditMode(true)}
                        className="cursor-pointer"
                      >
                        {form?.firstName || form?.lastName
                          ? `${form?.firstName || ""} ${form?.lastName || ""}` // Nếu form có dữ liệu, hiển thị form
                          : user.data.firstName || user.data.lastName
                          ? `${user.data.firstName || ""} ${
                              user.data.lastName || ""
                            }` // Nếu form rỗng, lấy từ user.data
                          : user.data.email}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <MailIcon className="size-8" />

                    <Input
                      value={user.data.email}
                      className="text-base font-montserrat"
                      disabled
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <LocateIcon className="size-8" />
                    <Input
                      placeholder="Location is empty"
                      name="address"
                      value={form.address}
                      onChange={handleFormChange}
                      className="text-base font-montserrat"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <PhoneCallIcon className="size-8" />

                    <Input
                      placeholder="Phone number is empty"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      className="text-base font-montserrat"
                    />
                  </div>
                  <div className="flex  justify-center">
                    <Button
                      type="submit"
                      variant="revanta"
                      className="w-full h-10"
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </div>
              <div className="col-span-1 bg-gradient-to-r from-gray-800 to-black p-6 rounded-xl shadow-lg border border-yellow-500 relative">
                {/* Hiệu ứng nền */}

                <div className="absolute inset-0 bg-yellow-500 opacity-10 rounded-xl z-20 pointer-events-none" />

                {/* Nội dung */}
                <div className="relative z-30">
                  {/* Huy hiệu thành viên */}

                  <div className="flex items-center gap-2 mb-3">
                    <CrownIcon className="w-8 h-8" />
                    <h1 className="font-bold text-2xl text-white">
                      Membership Tier
                    </h1>
                  </div>
                  {/* Cấp bậc thành viên */}
                  <p className="text-2xl text-yellow-400 font-bold">
                    Gold Member
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    Enjoy 15% off on all rentals, priority booking, and VIP
                    support.
                  </p>
                  {/* Dòng phân cách */}
                  <div className="h-0.5 bg-yellow-500 my-4 opacity-50"></div>
                  {/* Đặc quyền thành viên */}
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>
                      ✔️ <span className="text-yellow-400">15% Off</span> on all
                      rentals
                    </li>
                    <li>
                      ✔️{" "}
                      <span className="text-yellow-400">Priority booking</span>{" "}
                      for supercars
                    </li>
                    <li>
                      ✔️ <span className="text-yellow-400">VIP support</span>{" "}
                      24/7
                    </li>
                  </ul>
                  {/* Nút CTA */}
                  <Button variant={"shimmer"} className="mt-4 w-full">
                    Upgrade to Platinum
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="size-full ">
          <Order />
        </div>
      </div>
    </BackgroundLines>
  );
};

export default UserProfilePage;
