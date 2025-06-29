import { connectDB } from '@/lib/mongoose'
import Car from '@/models/Car'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const cars = await Car.find()
  return NextResponse.json(cars)
}

export async function POST(req: Request) {
  await connectDB()
  const { name } = await req.json()

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const car = await Car.create({ name })
  return NextResponse.json(car, { status: 201 })
}
