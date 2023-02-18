import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { IconType } from "react-icons";
import { RxChevronDown } from "react-icons/rx";
import Image from "next/image";
import { useIsMobile } from "../../../../lib/common/hooks/useIsMobile";
import Link from "next/link";
import { memo } from "react";

export type Category = {
  label: string;
  icon: IconType;
  highlightLabel?: string;
  items: {
    label: string;
    path: string;
    highlightLabel?: string;
  }[];
};

type Props = {
  categories: Category[];
  isCollapsed: boolean;
  toggleIsCollapsed: () => void;
};

function Navbar({ categories, isCollapsed, toggleIsCollapsed }: Props) {
  const isMobile = useIsMobile();
  const hoverBgColor = "hover:bg-gray-700";
  const bgColor = "bg-gray-800";

  const renderHighlightLabel = (label: string) => (
    <span className="rounded-full bg-sky-100 px-1 text-xs text-sky-500">
      {label}
    </span>
  );

  return (
    <>
      <nav
        className={classNames(
          "no-scrollbar z-50 flex h-[calc(100vh)] flex-col bg-white py-4 transition-all",
          "bg-white text-sm text-gray-300",
          bgColor,
          isCollapsed
            ? "w-16"
            : "w-53 galaxy-fold:min-w-[16rem] lg:min-w-[17rem]",
          {
            "w-0 -translate-x-full transform duration-150":
              isMobile && isCollapsed,
            "fixed z-10": isMobile && !isCollapsed,
          },
          "overflow-y-auto"
        )}
      >
        <Link
          href="/"
          onClick={() => {
            if (isMobile) {
              toggleIsCollapsed();
            }
          }}
          className={classNames(
            "relative w-full",
            isCollapsed ? "min-h-[3rem]" : "min-h-[4rem]"
          )}
        >
          <Image
            src={
              isCollapsed
                ? "/assets/logo-big.svg"
                : "/assets/logo-light-blue.svg"
            }
            fill
            alt="logo"
            className={classNames(
              !isCollapsed ? "object-left pl-7" : "object-center",
              "object-contain",
              "mix-blend-plus-lighter"
            )}
            sizes="100%"
            priority={true}
          />
        </Link>

        <div className="mt-3"></div>

        {categories.map((category) => (
          // TODO: change defaultOpen to false
          <Disclosure key={category.label} defaultOpen={true}>
            {({ open }) => {
              const Icon = category.icon;
              return (
                <>
                  <Disclosure.Button>
                    {isCollapsed ? (
                      <div className="group">
                        <div
                          className={classNames(
                            "m-1 aspect-square rounded-md",
                            hoverBgColor,
                            "flex items-center justify-center"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div
                          className={classNames(
                            "max-w-60 -mt-10 ml-15 rounded-xl border p-1 shadow-md",
                            bgColor,
                            "absolute z-50 hidden group-hover:block"
                          )}
                        >
                          {category.items.map((item) => (
                            <div
                              className={classNames(
                                "relative flex items-center rounded-xl pr-2 text-left transition",
                                hoverBgColor
                              )}
                              key={item.path}
                            >
                              <Link
                                href={item.path}
                                className="block truncate py-3.5 px-7 pr-2"
                              >
                                {item.label}
                              </Link>
                              <span>
                                {item.highlightLabel &&
                                  renderHighlightLabel(item.highlightLabel)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={classNames([
                          "flex items-center justify-between gap-2 py-3.5",
                          "pl-7 pr-3",
                          hoverBgColor,
                        ])}
                      >
                        <div className="flex items-center gap-2 font-medium text-gray-100">
                          <Icon className="h-4 w-4" />

                          {category.label}
                          {category.highlightLabel &&
                            renderHighlightLabel(category.highlightLabel)}
                        </div>

                        <div>
                          <RxChevronDown
                            className={classNames("h-4 w-4 transition", {
                              "rotate-180 transform": open,
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </Disclosure.Button>

                  {!isCollapsed && (
                    <Transition
                      className="overflow-hidden"
                      enter="transition transition-[max-height] duration-200 ease-in"
                      enterFrom="transform max-h-0"
                      enterTo="transform max-h-screen"
                      leave="transition transition-[max-height] duration-400 ease-out"
                      leaveFrom="transform max-h-screen"
                      leaveTo="transform max-h-0"
                      show={open}
                    >
                      <Disclosure.Panel static>
                        <ul className="flex flex-col">
                          {category.items.map((item) => (
                            <div
                              className={classNames(
                                "relative text-left transition",
                                hoverBgColor
                              )}
                              key={item.path}
                            >
                              <Link
                                href={item.path}
                                className="flex items-center gap-2 truncate py-3.5 pl-14 pr-2"
                                onClick={() => isMobile && toggleIsCollapsed()}
                              >
                                <span>{item.label}</span>
                                {item.highlightLabel &&
                                  renderHighlightLabel(item.highlightLabel)}
                              </Link>
                            </div>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </Transition>
                  )}
                </>
              );
            }}
          </Disclosure>
        ))}
      </nav>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
          onClick={toggleIsCollapsed}
        ></div>
      )}
    </>
  );
}

export default memo(Navbar);
