import { connectDB } from "@/lib/mongoose";
import Criteria from "@/models/Criteria";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const criteria = await Criteria.find();
  return NextResponse.json(criteria);
}

export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();

  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const criteria = await Criteria.create({ name });
  return NextResponse.json(criteria, { status: 201 });
}
