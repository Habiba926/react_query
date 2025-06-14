import Users from "@/models/users";
import dbConnect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 20;
    const skip = (page - 1) * limit;

    const users = await Users.find().skip(skip).limit(limit);

    const totalUsers = await Users.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({ data: users, total: totalUsers, totalPages: totalPages }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
