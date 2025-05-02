"use client";

import React from "react";
import { useAppContext } from "~~/contexts/AppContext";

export const MainPage = () => {
  const { setActiveView } = useAppContext();
  return (
    <div
      className="flex flex-col items-center justify-start bg-[white] w-full max-w-5xl mx-auto py-0 px-0"
    >
      <div className="flex w-full justify-center">
        <div className="w-full pt-2 sm:w-[430px]">
          <h1 className="text-black  font-normal leading-none mb-4">Ethereum R1</h1>
          <p className="text-black  font-normal mb-4">
            is a new rollup project grounded in the core values of Ethereum:
          </p>
          <div className="text-black mb-4 space-y-4">
            <div className="space-y-4">
              <ul className="pl-4">
                <li className="list-disc mb-4">100% donation-funded<br />
                No token. No VC. No private sales. Just public ETH contributions.{" "}
                {/*<button
                  onClick={() => setActiveView("donate")}
                  className="underline hover:opacity-80"
                >
                  Donate Now
                </button>*/}
                </li>
                <li className="list-disc mb-4">Stage 2 from day one<br />
                Permissionless proving. Transparent upgrade path. Long upgrade delays.
                </li>
                <li className="list-disc mb-4">Ethereum public good<br />
                Proportion of base fees go to R&D and app dev until 2030 — then they’re burned.</li>
                <li className="list-disc mb-4">Replaceable by design<br />
                No proprietary governance. No brand lock-in. No personalities to worship.
                </li>
              </ul>
            </div>
          </div>
          <div className="block w-full border-b-2 border-black border-dotted"></div>
          <p className="text-black  font-normal mb-4">Join the movement — open call to:</p>
          <div className="text-black mb-4 space-y-4">
            <ul className="pl-4">
              <li className="list-disc mb-4">Developers<br />
              Contribute to a credibly neutral rollup with no gatekeepers.</li>
              <li className="list-disc mb-4">App teams<br />
              Deploy to a censorship-resistant home.</li>
              <li className="list-disc mb-4">ETH holders<br />
              Fund Ethereum public goods, not extraction schemes.
              </li>
            </ul>
          </div>
          <p className="text-black  font-normal mb-8">
            Together, we build a rollup that belongs to Ethereum — not a foundation, not insiders, not even us.
          </p>

          <div className="text-black  font-normal mt-4 space-y-1">
            <div className="flex">
              <span className="mr-2">→</span>
              <a
                href="https://hackmd.io/@kzg/roadmapr1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border-b border-white hover:border-b hover:border-black"
              >
                Draft Roadmap
              </a>
            </div>
            <div className="flex">
              <span className="mr-2">→</span>
              <a
                href="https://github.com/ethereum-r1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border-b border-white hover:border-b hover:border-black"
              >
                GitHub
              </a>
              &nbsp;/&nbsp;
              <a
                href="https://x.com/ethereumR1"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-black border-b border-white hover:border-b hover:border-black"
              >
                Twitter
              </a>
              &nbsp;/&nbsp;
              <a
                href="https://t.me/ethereumR1"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-black border-b border-white hover:border-b hover:border-black"
              >
                Telegram
              </a>
            </div>
            <div className="flex">
              <span className="mr-2">→</span>
              <a
                href="https://twitter.com/intent/tweet?text=we+❤️+ethereum%0Awe+R1%0A@ethereumR1&url=https://ethereumr1.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border-b border-white hover:border-b hover:border-black"
              >
                Share the project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
