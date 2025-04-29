"use client";

import React from "react";

export const MainPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-start bg-[white] w-full max-w-5xl mx-auto py-0 px-0"
    >
      <div className="flex w-full justify-center" /*style={{ gap: '80px' }}*/>
        {/* Left Column */}
        <div className="w-full pt-12 sm:w-[430px]">
          <h1 className="text-black  font-normal leading-none mb-4">Ethereum R1</h1>
          <p className="text-black  font-normal mb-4">
            is a new rollup project grounded in the core values of Ethereum:
          </p>
          <div className="mb-4 space-y-4">
            <div className="space-y-4">
              <ul className="pl-4">
                <li className="list-disc mb-4">100% donation-funded<br />
                No token. No private sales. Just public ETH contributions.
                </li>
                <li className="list-disc mb-4">Stage 2 from day one<br />
                Permissionless proving. Long upgrade delays. Broad ecosystem-wide multisig.
                </li>
                <li className="list-disc mb-4">Ethereum public good<br />
                Proportion of base fees go to R&D and app dev until 2030 — then they're burned.</li>
                <li className="list-disc mb-4">Replaceable by design<br />
                No proprietary governance. No brand lock-in. No personalities to worship.
                </li>
              </ul>
            </div>
          </div>
          <div className="text-black  my-4">.....................................................</div>
          <p className="text-black  font-normal mb-4">Join the movement — open call to:</p>
          <div className="mb-4 space-y-4">
            <ul className="pl-4">
              <li className="list-disc mb-4">Developers<br />
                Ready to contribute to a truly public & neutral rollup.</li>
              <li className="list-disc mb-4">App teams<br />
                Seeking a censorship-resistant home.</li>
              <li className="list-disc mb-4">ETH holders<br />
                Ready to fund something aligned with Ethereum, not extraction.
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
                href="https://docs.google.com/document/d/1vEC1Eq-jbZAWBp5BAOH5gBYDeVjECfPJo-zNY_auZpI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border-b border-white hover:border-b hover:border-black"
              >
                Neutral Rollup Roadmap
              </a>
            </div>
            <div className="flex">
              <span className="mr-2">→</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black border-b border-white hover:border-b hover:border-black"
              >
                GitHub
              </a>
              &nbsp;/&nbsp;
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-black border-b border-white hover:border-b hover:border-black"
              >
                Discord
              </a>
              &nbsp;/&nbsp;
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-black border-b border-white hover:border-b hover:border-black"
              >
                Telegram
              </a>
              &nbsp;/&nbsp;
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-black border-b border-white hover:border-b hover:border-black"
              >
                Notion
              </a>
            </div>
            <div className="flex">
              <span className="mr-2">→</span>
              <a
                href="#"
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
