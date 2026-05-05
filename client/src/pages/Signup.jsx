import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // ✅ EXACT FIELD NAMES (must match backend)
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userMobile", userMobile);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);

      // ✅ optional image
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await axios.post(
        "https://findmynotes-backend-pxyf.onrender.com/auth/signup",
        formData
      );

      alert("✅ " + res.data.message);

    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration Failed ❌"
      );
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-[#f3f4f6]">
      <form
        onSubmit={registerUser}
        className="flex w-full max-w-[420px] flex-col gap-3 bg-white p-5"
      >
        <h1 className="text-2xl font-black">Register</h1>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <textarea
          placeholder="Bio"
          onChange={(e) => setUserBio(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="text"
          placeholder="Mobile"
          onChange={(e) => setUserMobile(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          className="border p-2"
          required
        />

        {/* Image preview */}
        <div className="flex flex-col items-center">
          <div className="h-[150px] w-[150px] rounded-full border flex items-center justify-center overflow-hidden">
            {profilePreviewImage ? (
              <img src={profilePreviewImage} alt="" />
            ) : (
              <p>Profile Image</p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfileImage(file);
                setProfilePreviewImage(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <button className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;