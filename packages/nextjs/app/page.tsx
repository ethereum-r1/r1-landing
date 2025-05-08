"use client";

import type { NextPage } from "next";
import { Donate } from "~~/components/Donate";
import { MainPage } from "~~/components/MainPage";
import { useAppContext } from "~~/contexts/AppContext";

const Home: NextPage = () => {
  const { activeView } = useAppContext();

  return (
    <div className="flex justify-center flex-col sm:flex-grow pt-4 bg-[white] sm:pt-14">
      <div id="mainDiv" className="px-5 bg-[white] w-full">{activeView === "r1" ? <MainPage /> : <Donate />}</div>
    </div>
  );
};

export default Home;
