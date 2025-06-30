import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Car from "@/models/Car";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const { inspection } = await req.json();

    if (!inspection || !Array.isArray(inspection)) {
      return NextResponse.json({ error: "Danh sách inspection không hợp lệ" }, { status: 400 });
    }

    const passedCount = inspection.filter((item) => item.is_good).length;

    let status = 0;
    if (passedCount === inspection.length) status = 2;
    else if (passedCount > 0) status = 1;

    const updatedCar = await Car.findByIdAndUpdate(id, { inspection, status }, { new: true });

    if (!updatedCar) {
      return NextResponse.json({ error: "Xe không tồn tại" }, { status: 404 });
    }

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.error("Error in PATCH /api/cars/[id]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const { criteriaIds } = await req.json();

    if (!Array.isArray(criteriaIds) || criteriaIds.length === 0 || criteriaIds.length > 5) {
      return NextResponse.json({ error: "Chọn từ 1 đến 5 tiêu chí" }, { status: 400 });
    }

    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json({ error: "Không tìm thấy xe" }, { status: 404 });
    }

    car.inspection = criteriaIds.map((criteriaId: string) => ({
      criteriaId,
      is_good: true,
    }));

    car.status = 1;
    await car.save();

    return NextResponse.json(car);
  } catch (error) {
    console.error("Error in POST /api/cars/[id]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}