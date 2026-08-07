import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:3000";
  const url = name
    ? `${backendUrl}/greet?name=${encodeURIComponent(name)}`
    : `${backendUrl}/greet`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch greeting from backend" },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
