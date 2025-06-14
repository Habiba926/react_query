"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["users", pageNumber],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/api/users?page=${pageNumber}`
      );
      return res.json();
    },
    // staleTime: 1 * 1000,
    cacheTime: 5 * 60 * 1000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  if (isPending) {
    return <div className="text-2xl text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 xl:gap-7 py-5">
        {data?.data?.map((v) => (
          <Link
            href={`/users/${v._id}`}
            key={v._id}
            className={`overflow-hidden rounded-xl shadow-xl flex flex-col gap-3 p-5 border-2 ${
              v.gender === "Male"
                ? "border-blue-500"
                : v.gender === "Female"
                ? "border-red-500"
                : "border-black"
            }`}
          >
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-sm">Username</div>
              <div className="text-sm">{v.username}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-sm">Email</div>
              <div className="text-sm">{v.email}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="font-semibold text-sm">Phone</div>
              <div className="text-sm">{v.phone}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 my-5">
        <button
          className="py-1 px-4 bg-blue-100 hover:bg-blue-300 active:bg-blue-500 active:text-white duration-300 cursor-pointer disabled:bg-gray-200 disables:cursor-not-allowed disabled:text-black"
          disabled={pageNumber < 2}
          onClick={() => {
           if (pageNumber > 1){
                 setPageNumber((prev) => prev - 1);
           }
          }}
        >
          Prev
        </button>
        <div className="text-2xl font-bold">
          {pageNumber} of {data?.totalPages}
        </div>
        <button
          className="py-1 px-4 bg-blue-100 hover:bg-blue-300 active:bg-blue-500 active:text-white duration-300 cursor-pointer disabled:bg-gray-200 disables:cursor-not-allowed disabled:text-black"
          disabled={pageNumber >= data?.totalPages}
          onClick={() => {
            if(pageNumber < data?.totalPages){
                setPageNumber((prev) => prev + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
