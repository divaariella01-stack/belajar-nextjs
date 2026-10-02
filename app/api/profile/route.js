import { NextResponse } from "next/server";

export async function GET() {
  const profileData = {
    name: "Diva Ariella",
    role: "peserta bootcamp",
    favoriteTech: ["Next.js", "React", "Tailwind CSS"],
  };

  return NextResponse.json(profileData);
}