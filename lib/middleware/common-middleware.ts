import { NextRequest, NextResponse } from "next/server";

export default function CommonMiddleware(req: NextRequest) {
  return NextResponse.next();
}