import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center min-h-[100px] w-full border-t bg-[#0f172a] text-white px-6 backdrop-blur-md">
      <div className="flex w-full max-w-6xl flex-col justify-between gap-4 py-8 sm:flex-row">
        <div className="flex flex-col gap-2">
          <a className="flex w-full items-center justify-start gap-2">
            <span className="text-xl font-[900] tracking-wider">RecruitAI</span>
          </a>
          <div className="max-w-[320px] text-sm">
            RecruitAI is an advanced AI-powered tool that helps recruiters efficiently screen candidates, detect fake job postings, and match the right talent with the right opportunities.
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div>AI Solutions Inc.</div>
            <div>Copyright © 2024 - All rights reserved</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center">
          <div className="flex w-full flex-col items-start justify-start gap-2 text-sm md:flex-row md:gap-6">
            <div className="flex flex-col items-start md:items-end justify-start gap-2">
              <a className="hover:underline" href="">About Us</a>
              <a className="hover:underline" href="">Features</a>
              <a className="hover:underline" href="">Blog</a>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <a className="hover:underline" href="">Privacy Policy</a>
              <a className="hover:underline" href="">Terms of Service</a>
              <a className="hover:underline" href="">Contact Us</a>
            </div>
          </div>
          <div className="hidden h-5 border-l border-white sm:block"></div>
          <a className="flex items-center justify-center whitespace-nowrap font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-black border-input bg-background hover:bg-white h-10 md:h-8 text-xs px-3 rounded-full">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
