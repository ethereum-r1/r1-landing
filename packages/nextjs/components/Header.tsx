"use client";

import React from "react";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useAppContext } from "~~/contexts/AppContext";

type HeaderMenuLink = {
  label: string;
  view: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Ethereum R1",
    view: "r1",
  },
  {
    label: "Donate",
    view: "donate",
  },
];

export const HeaderMenuLinks = () => {
  const { activeView, setActiveView } = useAppContext();

  return (
    <>
      {menuLinks.map(({ label, view, icon }) => {
        const isActive = activeView === view;
        return (
          <li key={view} className="list-none">
            <button
              onClick={() => setActiveView(view)}
              className={`relative text-black bg-transparent border-none outline-none focus:outline-none focus:bg-transparent active:bg-transparent hover:bg-transparent p-0 transform transition-transform hover:translate-x-[-2px] hover:translate-y-[2px] text-[12px] font-mono ${
                isActive ? "underline font-bold" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          </li>
        );
      })}
    </>
  );
};

// R1 Logo Component
const R1Logo = () => {
  return (
    <div className="flex items-center justify-center mr-0 pr-2">
      <img src="https://ipfs.io/ipfs/bafkreigvmtragf5skadr2ghxexajbayhgcrmtp2tciv7bpvhscworeyeie/" alt="R1 Logo" width={36} height={36} />
    </div>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { setActiveView, activeView } = useAppContext();

  return (
    <div className="sticky lg:static top-0 bg-[white] min-h-0 h-16 flex flex-row flex-shrink-0 justify-between z-20 px-0">
      <div className="w-auto lg:w-1/2 flex items-center">
        <button
          onClick={() => setActiveView("r1")}
          className="flex items-center gap-2 ml-4 mr-6 shrink-0 cursor-pointer bg-transparent border-none outline-none"
        ></button>
        <ul className="flex flex-nowrap px-1 gap-6 list-none">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="flex items-center justify-end pr-6 gap-6">
        {activeView === "donate" && (
          <div className="min-w-[200px] flex justify-end">
            <RainbowKitCustomConnectButton />
          </div>
        )}
        <div className="scale-125">
          <R1Logo />
        </div>
      </div>
    </div>
  );
};
