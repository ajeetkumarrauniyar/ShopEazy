import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId, has, orgId } = await getAuth(req);

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (has({ permission: "super-admin" })) {
    return NextResponse.json({ message: "Super-admin access granted" });
  }

  if (orgId && has({ permission: "org:admin" })) {
    return NextResponse.json({
      message: `Admin access granted for org ${orgId}`,
    });
  }

  return NextResponse.json({ message: "User access granted" });
}
