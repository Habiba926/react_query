import Users from "@/models/users";
import dbConnect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const users = await Users.find();

        return NextResponse.json(
            { data: users },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}