import React, { useState, useRef } from "react";
// 👈 1. Redux aur Axios import kiya data aur API call ke liye
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Package, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

function Profile() {
  // 👈 2. Redux se logged-in user ko nikaala
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // 👈 3. Avatar aur File ke states
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profilePic || "/Niraj.jpeg",
  );
  const [selectedFile, setSelectedFile] = useState(null); // 👈 Asli file store karne ke liye

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // 👈 State mein file save ki
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 👈 4. Asli API Call Logic (Bina UI change kiye)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 👈 Image aur Text bhejne ke liye FormData banaya
      const formData = new FormData();

      // 👈 Form input IDs ka use karke value nikaali
      formData.append("firstName", e.target.firstName.value);
      formData.append("lastName", e.target.lastName.value);
      formData.append("phone", e.target.phone.value);
      formData.append("address", e.target.address.value);
      formData.append("city", e.target.city.value);
      formData.append("zipCode", e.target.zip.value); // Aapke input ka id "zip" hai

      // 👈 Agar nayi photo select ki hai tabhi append karo
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // 👈 API Request (Apne backend URL ke hisaab se port change kar lena, ex: 5000 ya 8000)
      const res = await axios.put(
        `http://localhost:8080/api/v1/user/update/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.data.success) {
        // 👈 Update hone par Redux state update karo taaki Navbar mein turant photo change ho jaye
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Profile Updated Successfully!"); // Yaha sonner toast laga sakte ho
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex justify-center mb-8 sm:mb-10">
            <TabsList className="bg-white shadow-md border border-gray-100 p-1 rounded-full w-full max-w-[300px] sm:max-w-md flex">
              <TabsTrigger
                value="profile"
                className="rounded-full w-1/2 py-2 sm:py-2.5 data-[state=active]:bg-pink-600 data-[state=active]:text-white transition-all font-medium text-gray-600 text-sm sm:text-base"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-full w-1/2 py-2 sm:py-2.5 data-[state=active]:bg-pink-600 data-[state=active]:text-white transition-all font-medium text-gray-600 text-sm sm:text-base"
              >
                Orders
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="profile"
            className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-pink-600 tracking-tight">
              Update Profile
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="w-full lg:w-1/3 flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <img
                    src={avatarPreview}
                    alt="Profile Avatar"
                    className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white shadow-xl bg-pink-50"
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />

                <Button
                  type="button"
                  onClick={triggerFileInput}
                  className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-4 sm:px-6 text-sm sm:text-base shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Picture
                </Button>
              </div>

              <Card className="w-full lg:w-2/3 shadow-xl border-0 rounded-2xl bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <form
                    onSubmit={handleUpdateProfile}
                    className="space-y-5 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-gray-700 font-semibold text-sm sm:text-base"
                        >
                          First Name
                        </Label>
                        {/* 👈 defaultValue mein user ka current data daal diya taaki puraane naam dikhe */}
                        <Input
                          id="firstName"
                          defaultValue={user?.firstName || ""}
                          className="bg-gray-50 focus-visible:ring-pink-500 rounded-lg h-10 sm:h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-gray-700 font-semibold text-sm sm:text-base"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue={user?.lastName || ""}
                          className="bg-gray-50 focus-visible:ring-pink-500 rounded-lg h-10 sm:h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-semibold text-sm sm:text-base"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                        disabled
                        className="bg-gray-100 text-gray-500 cursor-not-allowed rounded-lg h-10 sm:h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-gray-700 font-semibold text-sm sm:text-base"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        defaultValue={user?.phone || ""}
                        placeholder="Enter your Contact No"
                        className="bg-gray-50 focus-visible:ring-pink-500 rounded-lg h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-gray-700 font-semibold text-sm sm:text-base"
                      >
                        Address
                      </Label>
                      <Input
                        id="address"
                        defaultValue={user?.address || ""}
                        placeholder="Enter your Address"
                        className="bg-gray-50 focus-visible:ring-pink-500 rounded-lg h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="text-gray-700 font-semibold text-sm sm:text-base"
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          defaultValue={user?.city || ""}
                          placeholder="Enter your City"
                          className="bg-gray-50 focus-visible:ring-pink-500 rounded-lg h-10 sm:h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="zip"
                          className="text-gray-700 font-semibold text-sm sm:text-base"
                        >
                          Zip Code
                        </Label>
                        <Input
                          id="zip"
                          defaultValue={user?.zipCode || ""}
                          placeholder="Enter your ZipCode"
                          className="bg-gray-50 focus-visible:ring-pink-500 rounded-lg h-10 sm:h-11"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-base sm:text-lg rounded-xl shadow-lg shadow-pink-200 transition-all hover:-translate-y-0.5 mt-2 sm:mt-4 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                          Updating...
                        </>
                      ) : (
                        <>
                          <User className="w-5 h-5 mr-2" /> Update Profile
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="orders"
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <Card className="w-full shadow-xl border-0 rounded-2xl bg-white min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center p-6 sm:p-8 text-center mx-auto max-w-3xl">
              <div className="bg-pink-50 p-4 sm:p-6 rounded-full mb-4">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 text-pink-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                No Orders Yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-sm mb-6">
                Looks like you haven't made your first purchase yet. Start
                shopping to see your orders here!
              </p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 shadow-md text-sm sm:text-base">
                Start Shopping
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
