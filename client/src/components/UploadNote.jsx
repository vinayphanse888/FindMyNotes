import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UploadNote = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState("");

  const user = useSelector((state) => state.user.userData);

  // ✅ FIX: safe access
  const userId = user?.user?._id;

  const submitFile = async (e) => {
    try {
      e.preventDefault();

      // ✅ FIX: check user login
      if (!userId) {
        alert("User not logged in");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);
      formData.append("userId", userId);

      console.log("User:", user);
      console.log("UserId:", userId);

      // ✅ FIX: removed manual headers
      const result = await axios.post(
        "https://findmynotes-backend-pxyf.onrender.com/notes/upload",
        formData
      );

      console.log("Data: ", result);
      alert("Notes Uploaded Successfully");

    } catch (error) {
      console.log("Failed to submit file: ", error);
    }
  };

  return (
    <form
      className="flex h-full w-full max-w-[770px] flex-col items-center justify-start p-5 md:border md:border-gray-300 lg:justify-center"
      onSubmit={submitFile}
    >
      <h1 className="mb-5 text-2xl font-black">Upload Your Notes</h1>

      <div className="mb-5 w-full max-w-[550px] ">
        <input
          type="text"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
        />
      </div>

      <div className="mb-5 w-full max-w-[550px] ">
        <input
          type="text"
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
        />
      </div>

      <div className="mb-5 w-full max-w-[550px] ">
        <input
          type="text"
          placeholder="Tags"
          required
          onChange={(e) => setTags(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5"
        />
      </div>

      <div className="flex w-full max-w-[550px] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to Upload</span>
            </p>
            <p className="text-xs text-gray-500">PDF</p>

            <input
              type="file"
              accept="application/pdf"
              required
              id="dropzone-file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </div>
        </label>
      </div>

      <button
        className="my-5 w-full max-w-[550px] rounded-xl bg-blue-500 py-3 font-bold text-white hover:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default UploadNote;