import client, { getApiUrl } from "@/core/client";
import { BaseResponse } from "@/core/handleResponse";
import { Spacer } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FaDiscord,
  FaFacebookF,
  FaGlobeAsia,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
function GroupDetailPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["group", { groupId: router.query.groupId }],
    queryFn: async () => {
      const res = await client.get<BaseResponse>(
        `${getApiUrl("action")}/cws/groups/${router.query.groupId}`
      );
      if (res.status === 400) {
        throw new Error("Not found");
      }
      return res.data;
    },
    retry: false,
  });
  useEffect(() => {
    if (router.query.groupId) {
      console.log(router.query.groupId);
    }
  }, [router.query.groupId]);
  if (!isLoading && isError) {
    router.push("/admin/groups");
  }
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="easy-in-out container transform bg-white shadow-lg duration-200 sm:w-full md:w-full lg:w-full xl:w-full">
        <div className="h-full overflow-hidden">
          <img className="w-full" src={data?.data.cover_url} alt="cover" />
        </div>
        <div className="-mt-12 flex justify-center px-5">
          <img
            className="h-32 w-32 rounded-full bg-white p-2"
            src={data?.data.avatar_url}
            alt="avatar"
          />
        </div>
          <div className="px-14 text-center">
            <p className="text-3xl font-bold text-gray-800">
              {data?.data.name}
            </p>
            <span className=" text-gray-400 hover:text-blue-500">
              @{data?.data.username}
            </span>
            <div className="flex justify-center gap-2 text-sm font-bold uppercase leading-normal text-gray-500">
              <FaGlobeAsia fill="#3b82f6" className="mt-1"/>
              <span>{data?.data.country}</span>
            </div>
            <Spacer p={"4"}/>
            <div className="flex justify-center text-sm leading-normal">
            <p className="text-xl font-bold text-gray-800">
              {data?.data.headline}
            </p>
            </div>
            <div className="flex justify-center text-sm leading-normal">
              <p className="text-sm">{data?.data.desc_en}</p>
            </div>
          </div>
        <Spacer p={10}/>
          <div className="flex bg-gray-50">
            <div className="w-1/6 cursor-pointer p-4 text-center hover:bg-gray-100">
              <a href={data?.data.facebook_url} target="_blank" rel="noreferrer">
                <FaFacebookF fill="#18bbf2" size={26}/>
              </a>
            </div>
            <div className="w-1/6 cursor-pointer p-4 text-center hover:bg-gray-100">
            <a href={data?.data.twitter_url} target="_blank" rel="noreferrer">
                <FaTwitter fill="#18bbf2" size={26}/>
              </a>
            </div>
              <div className="w-1/6 cursor-pointer p-4 text-center hover:bg-gray-100">
            <a href={data?.data.youtube_url} target="_blank" rel="noreferrer"><FaYoutube fill="#f00" size={26}/></a>
            </div>
             <div className="w-1/6 cursor-pointer p-4 text-center hover:bg-gray-100">
             <a href={data?.data.instagram_url} target="_blank" rel="noreferrer"><FaInstagram fill="#f5018c" size={26}/></a>
            </div>
             <div className="w-1/6 cursor-pointer p-4 text-center hover:bg-gray-100">
             <a href={data?.data.discord_url}  target="_blank"   rel="noreferrer"><FaDiscord fill="#5865f2" size={26}/></a>
            </div>
               <div className="w-1/6 cursor-pointer p-4 text-center hover:bg-gray-100">
             <a href={data?.data.telegram_url} target="_blank" rel=" noreferrer"><FaTelegram fill="#35abe7" size={26}/></a>
            </div>
          </div>
        </div>
      </div>
  );
}
export default GroupDetailPage;
