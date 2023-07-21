import React from "react";
import logo from "../Fotos/logo.png"
import tripadvisor from "../Fotos/tripadvisor.png"

const Footer = () => {
  return (
    <div id="contact" className="bg-gray-50 flex flex-row flex-wrap items-center justify-around p-10">
      <a href="/" className="w-1/2 pl-5 mb-2 lg:visible lg:w-auto lg:pl-0 lg:mb-0">
        <img width="70%" src={logo} alt="logo"/>
      </a>
      <div className="flex items-center justify-around w-2/3 pt-5 lg:pt-0 lg:w-1/3 ">
        <a href="#">
            <svg className="text-blue-600 hover:text-blue-700" width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.2106 0.48291H1.75153C1.04307 0.48291 0.470703 1.05528 0.470703 1.76374V31.2229C0.470703 31.9313 1.04307 32.5037 1.75153 32.5037H31.2106C31.9191 32.5037 32.4915 31.9313 32.4915 31.2229V1.76374C32.4915 1.05528 31.9191 0.48291 31.2106 0.48291ZM27.5122 9.82897H24.9546C22.9493 9.82897 22.561 10.7816 22.561 12.1825V15.2685H27.3481L26.7237 20.0996H22.561V32.5037H17.5698V20.1036H13.3951V15.2685H17.5698V11.7062C17.5698 7.57151 20.0954 5.31805 23.7858 5.31805C25.555 5.31805 27.072 5.45013 27.5163 5.51017V9.82897H27.5122Z" fill="currentColor"/></svg>
        </a>
        <a href="#">
            <img src={tripadvisor} width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"></img>
        </a>
      </div>
      <div className="mt-10 text-lg text-blue-800 lg:mt-0">
          Copyright 2023 Rosystems
      </div>
    </div>
  );
};

export default Footer;