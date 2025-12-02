import React from "react";

import { getFreelanceExperience } from "@/lib/helpers";

import CodeLine from "./code-line";
import SkillTags from "./skill-tag";

export default function CodeBlock() {
  return (
    <section
      aria-label="Simulated code block with developer information"
      className="w-full lg:w-1/2 bg-gradient-to-r from-black to-[#0a0d37] border border-[#1b2c68a0] relative rounded-lg shadow-lg px-2 sm:px-0 text-foreground"
    >
      {/* Top visual lines */}
      <div className="flex flex-row">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent" />
      </div>

      {/* Semantic header */}
      <header className="px-4 lg:px-8 py-5 flex justify-between items-center bg-[#000000] rounded-t-lg">
        <div className="flex flex-row space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-orange-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="text-xs sm:text-sm text-gray-400 font-mono">coder . js</div>
      </header>

      {/* Main code body */}
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8 relative">
        {/* Decorative blurred background blobs */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-blue-600 rounded-full opacity-10 filter blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-pink-600 rounded-full opacity-10 filter blur-3xl" />

        <div className="relative flex">
          {/* Line numbers (hidden from screen readers) */}
          <div
            className="hidden md:flex flex-col items-end pr-4 pt-[6px] text-gray-500 text-sm select-none opacity-70 leading-relaxed"
            aria-hidden="true"
          >
            {[...Array(12).keys()].map((n) => (
              <div key={n} className="pb-[6px]">
                {n + 1}
              </div>
            ))}
          </div>

          {/* Simulated code block */}
          <code className="text-base sm:text-xl font-mono">
            <div>
              <span className="text-pink-400 mr-2">const</span>
              <span className="mr-2 text-violet-400">profile</span>
              <span className="mr-2 text-pink-400">=</span>
              <span className="text-gray-400">{"{"}</span>
            </div>
            <CodeLine label="name" value="Zoran Krstić" />
            <CodeLine label="role" value="Frontend Developer" />
            <CodeLine label="freelanceExperience" value={getFreelanceExperience()} />
            <CodeLine label="location" value="Serbia" />
            <div className="pl-6">
              <span className="text-zinc-300 mr-1">stack:</span>
              <span className="text-gray-400">{"["}</span>
              <SkillTags />
              <div className="pl-0">
                <span className="text-gray-400 mr-1">{"]"}</span>
                <span>,</span>
              </div>
            </div>
            <div>
              <span className="text-gray-400 mr-1">{"}"}</span>
              <span>;</span>
            </div>
          </code>
        </div>
      </div>

      {/* Semantic footer */}
      <footer className="mx-4 lg:mx-8 my-4 border-t border-indigo-900 py-3 text-xs sm:text-sm text-gray-500 flex justify-between items-center">
        <div>UTF-8</div>
        <div>JavaScript</div>
        <div>Ln 12, Col 1</div>
      </footer>
    </section>
  );
}
