"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/users/${id}`);
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
      <div
        className={`max-w-[500px] mx-auto overflow-hidden rounded-xl shadow-xl flex flex-col gap-3 p-5 border-2 ${
          data?.data?.gender === "Male"
            ? "border-blue-500"
            : data?.data?.gender === "Female"
            ? "border-red-500"
            : "border-black"
        }`}
      >
        <div className="flex gap-3 items-center">
          <div className="font-semibold text-sm">Username</div>
          <div className="text-sm">{data?.data?.username}</div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="font-semibold text-sm">Email</div>
          <div className="text-sm">{data?.data?.email}</div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="font-semibold text-sm">Phone</div>
          <div className="text-sm">{data?.data?.phone}</div>
        </div>
      </div>
    </div>
  );
}
