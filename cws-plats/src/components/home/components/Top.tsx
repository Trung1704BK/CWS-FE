/* eslint-disable @next/next/no-img-element */
import React from "react";

function Top() {
  return (
    <div className="container mx-auto flex items-center justify-center py-12 px-4 sm:px-6 2xl:px-0">
      <div className="flex flex-col items-center justify-center space-y-6 lg:flex-row lg:space-y-0">
        <div className="flex w-80 flex-col items-start justify-start sm:w-auto">
          <div>
            <p className="text-3xl font-semibold leading-9 text-gray-800 dark:text-white xl:text-4xl">
              Renovate your home
            </p>
          </div>
          <div className="mt-4 lg:w-4/5 xl:w-3/5">
            <p className="text-base leading-6 text-gray-600 dark:text-white">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="mt-16 w-full">
            <button className="flex h-14 w-full items-center justify-between  bg-gray-900 px-4 text-white outline-none hover:bg-gray-700 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 lg:w-72">
              <p className="text-xl font-medium leading-5 ">See More</p>
              <img
                className="dark:hidden"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cta-III-svg1.svg"
                alt="arrow"
              />
              <img
                className="hidden dark:block"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cta-III-svg1dark.svg"
                alt="arrow"
              />
            </button>
          </div>
        </div>

        <div className="jusitfy-center flex flex-col items-center space-y-4 sm:flex-row sm:space-x-5 sm:space-y-0 xl:space-x-8">
          <div className="">
            <img
              className="hidden lg:block"
              src="https://i.ibb.co/61TfVVW/olena-sergienko-gx-KL334b-UK4-unsplash-1.png"
              alt="sofa"
            />
            <img
              className="w-80 sm:w-auto lg:hidden"
              src="https://i.ibb.co/QvxmJjB/olena-sergienko-gx-KL334b-UK4-unsplash-1-1.png"
              alt="sofa"
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-0 lg:space-y-5 xl:space-y-8">
            <div>
              <img
                className="hidden lg:block"
                src="https://i.ibb.co/1MY5P3y/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-1.png"
                alt="chairs"
              />
              <img
                className="w-80 sm:w-auto lg:hidden"
                src="https://i.ibb.co/r0rvcCh/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1.png"
                alt="chairs"
              />
            </div>
            <div>
              <img
                className="hidden lg:block"
                src="https://i.ibb.co/9N7ZX2C/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1.png"
                alt="chairs"
              />
              <img
                className="w-80 sm:w-auto lg:hidden"
                src="https://i.ibb.co/0BFt400/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-2.png"
                alt="chairs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
