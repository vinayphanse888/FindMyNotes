import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-16">
      <div className="flex h-full w-full flex-col gap-10 px-20 lg:flex-row lg:justify-between">
        <div className=" lg:w-[450px]">
          <h2 className="relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-500">
            About Us
          </h2>
          <p className="text-gray-600">
            Because your planning is not always perfect, you need to be able to
            study whenever, wherever. Just read your notes one last time on your
            tablet or phone while you're on the go.
          </p>
        </div>
        {/* Quick Links section removed */}
        <div className="">
          <h2 className="relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-500">
            Contact Info
          </h2>
          <ul className="text-gray-600">
            <li className="mb-1">
              <p>+91 12345 67890</p>
            </li>
            <li className="mb-1">
              <p>+91 12345 67890</p>
            </li>
            <li className="mb-1">
              <p>findmynotes2022@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
