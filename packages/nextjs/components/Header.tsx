"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useAppContext } from "~~/contexts/AppContext";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Ethereum R1",
    href: "/",
  },
  {
    label: "Donate",
    href: "/donate",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        return (
          <li key={href} className="list-none">
            <Link
              href={href}
              className={`relative text-black bg-transparent outline-none focus:outline-none focus:bg-transparent active:bg-transparent hover:bg-transparent hover:border-b border-black p-0 transform transition-transform ${
                pathname === href ? "border-b border-black" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="fixed w-full top-0 min-h-0 h-16 flex flex-row flex-shrink-0 justify-between z-20 px-4 bg-white sm:bg-transparent">
        <div className="w-auto lg:w-1/2 flex items-center">
          <ul className="flex flex-nowrap px-1 gap-6 list-none">
            <HeaderMenuLinks />
          </ul>
        </div>
        <div className="flex items-center justify-end gap-6">
          <div className="line leading-none">
            /R\
            <br />
            \1/
          </div>
        </div>
      </div>
      <div className="block relative pt-20 sm:fixed sm:top-4 sm:right-14 sm:z-20 sm:pt-0">
        {pathname === "/donate" && (
          <div className="flex px-5 flex-start sm:justify-end">
            <RainbowKitCustomConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};
