import Users from "@/models/users";
import dbConnect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const users = await Users.findById({ _id: id });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
