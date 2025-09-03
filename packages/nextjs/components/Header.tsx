"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useAppContext } from "~~/contexts/AppContext";

type HeaderMenuLink = {
  label: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
};

const PulsingAsterisk = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(v => !v);
    }, 750);
    return () => clearInterval(interval);
  }, []);

  return <span style={{ visibility: visible ? "visible" : "hidden" }}>*</span>;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: (
      <span className="nav-item">
        Ethereum R1
      </span>
    ),
    href: "/",
  },
  {
    label: (
      <>
        <PulsingAsterisk /> <span className="nav-item">Reclaim
        Donation</span> 
      </>
    ),
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
              className={`relative text-black bg-transparent outline-none focus:outline-none focus:bg-transparent active:bg-transparent hover:bg-transparent border-black p-0 transform transition-transform ${
                pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""
              }`}
            >
              {icon}
              {label}
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
      <div className="fixed w-full top-0 min-h-0 h-16 flex flex-row flex-shrink-0 justify-between z-20 px-4 bg-white lg:bg-transparent">
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
        {pathname?.includes("/donate") && (
          <div className="flex px-5 flex-start sm:justify-end">
            <RainbowKitCustomConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};
