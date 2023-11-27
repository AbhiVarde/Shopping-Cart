"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  label: string;
  subMenuItems?: { label: string; link: string }[];
}

const MenuItem = ({ label, subMenuItems }: MenuItemProps) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsSubMenuVisible(true);
  };
  const handleMouseLeave = () => {
    setIsSubMenuVisible(false);
  };

  return (
    <div
      className="relative inline-block "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {subMenuItems ? (
        <>
          <span className="cursor-pointer text-sm text-[#888888] hover:text-[#ededed] active:text-[#ededed]">
            {label}
          </span>
          {isSubMenuVisible && (
            <div className="origin-top-right absolute  mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {subMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    passHref
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href={`/${label.toLowerCase()}`}
          passHref
          className="text-sm text-[#888888] hover:text-[#ededed] active:text-[#ededed]"
        >
          {label}
        </Link>
      )}
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const menuItems: MenuItemProps[] = [
    { label: "Dashboard" },
    {
      label: "Events",
      subMenuItems: [
        { label: "Upcoming Events", link: "/events/upcoming" },
        { label: "Past Events", link: "/events/past" },
        { label: "Create New Event", link: "/events/create" },
      ],
    },
    {
      label: "Venues",
      subMenuItems: [
        { label: "All Venues", link: "/venues/all" },
        { label: "Add New Venue", link: "/venues/add" },
      ],
    },
    { label: "About" },
    { label: "Contact" },
  ];

  return (
    <div className="min-h-screen font-Inter">
      <nav className="bg-black border-b border-gray-200">
        <div className="container mx-auto px-16">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-6">
              <button className="text-base sm:text-lg font-medium text-white">
                NextEvent
              </button>
              <div className="space-x-4">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    label={item.label}
                    subMenuItems={item.subMenuItems}
                  />
                ))}
              </div>
            </div>
            <button
              className="bg-[#ededed] text-sm py-2 px-3 font-medium p-[0px 12px] rounded-md"
              onClick={() => router.push("/login")}
            >
              LogIn
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
