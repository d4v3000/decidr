import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  console.log(req.cookies.get("question-token"));
  if (req.cookies.get("question-token")) return;

  const random = nanoid();
  const res = NextResponse.next();

  res.cookies.set("question-token", random, { sameSite: "strict" });

  return res;
}
