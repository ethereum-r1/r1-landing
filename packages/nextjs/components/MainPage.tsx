"use client";

import React from "react";

export const MainPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-start bg-[white] w-full max-w-5xl mx-auto py-0 px-8 font-mono"
      style={{ lineHeight: "133%" }}
    >
      <div className="flex w-full justify-center" /*style={{ gap: '80px' }}*/>
        {/* Left Column */}
        <div className="w-[380px]">
          <h1 className="text-black text-xs font-normal leading-none mb-4">Ethereum (R1)</h1>
          <p className="text-black text-xs font-normal mb-4">
            is a new rollup project grounded in the core values of Ethereum:
          </p>
          <div className="mb-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-0">
                <div className="text-black text-xs font-normal">• 100% donation-funded</div>
                <div className="text-black text-xs font-normal pl-4">
                  No token. No private sales. Just public ETH contributions.
                </div>
              </div>
              <div className="space-y-0">
                <div className="text-black text-xs font-normal">• Stage 2 from day one</div>
                <div className="text-black text-xs font-normal pl-4">
                  Permissionless proving. Long upgrade delays. Broad ecosystem-wide multisig.
                </div>
              </div>
              <div className="space-y-0">
                <div className="text-black text-xs font-normal">• Ethereum public good</div>
                <div className="text-black text-xs font-normal pl-4">
                  Proportion of base fees go to R&D and app dev until 2030 — then they're burned.
                </div>
              </div>
              <div className="space-y-0">
                <div className="text-black text-xs font-normal">• Replaceable by design</div>
                <div className="text-black text-xs font-normal pl-4">
                  No proprietary governance. No brand lock-in. No personalities to worship.
                </div>
              </div>
            </div>
          </div>
          <div className="text-black text-xs my-4">.....................................................</div>
          <p className="text-black text-xs font-normal mb-4">Join the movement — open call to:</p>
          <div className="mb-4 space-y-4">
            <div className="space-y-0">
              <div className="text-black text-xs font-normal">• Developers</div>
              <div className="text-black text-xs font-normal pl-4">
                Ready to contribute to a truly public & neutral rollup.
              </div>
            </div>
            <div className="space-y-0">
              <div className="text-black text-xs font-normal">• App teams</div>
              <div className="text-black text-xs font-normal pl-4">Seeking a censorship-resistant home.</div>
            </div>
            <div className="space-y-0">
              <div className="text-black text-xs font-normal">• ETH holders</div>
              <div className="text-black text-xs font-normal pl-4">
                Ready to fund something aligned with Ethereum, not extraction.
              </div>
            </div>
          </div>
          <p className="text-black text-xs font-normal mb-8">
            Together, we build a rollup that belongs to Ethereum — not a foundation, not insiders, not even us.
          </p>

          <div className="text-black text-xs font-normal mt-4 space-y-1">
            <div className="flex">
              <span className="mr-2">→</span>
              <a
                href="https://docs.google.com/document/d/1vEC1Eq-jbZAWBp5BAOH5gBYDeVjECfPJo-zNY_auZpI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline transition-all hover:scale-105"
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
                className="text-black underline transition-all hover:scale-105"
              >
                GitHub
              </a>
              &nbsp;/&nbsp;
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-black underline transition-all hover:scale-105"
              >
                Discord
              </a>
              &nbsp;/&nbsp;
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-black underline transition-all hover:scale-105"
              >
                Telegram
              </a>
              &nbsp;/&nbsp;
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-black underline transition-all hover:scale-105"
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
                className="text-black underline transition-all hover:scale-105"
              >
                Share the project
              </a>
            </div>
          </div>
        </div>
        {/* Right Column
        <div className="w-[320px]">
          <br></br>
          <h2 className="text-black text-xs font-normal leading-none mb-3">Current team</h2>
          
          <div className="text-black text-xs font-normal">
            <div className="leading-tight">
              jiajun.eth<br/>
              kzg.eth<br/>
              Jünger<br/>
              & friends
            </div>

            <div className="my-3">...............</div>

            <h2 className="text-black text-xs font-normal leading-none mb-3">Supporters</h2>

            <div className="leading-tight">
              Anna Kazlauskas<br/>
              lefteris.eth<br/>
              James Prestwich<br/>
              Eric Wall<br/>
              dcbuilder.eth
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};
