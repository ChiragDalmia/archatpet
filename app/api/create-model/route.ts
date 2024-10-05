import { NextResponse } from "next/server";

const API_KEY = process.env.MESHY_API_KEY;

export async function POST(request: Request) {
  const { imageUrl } = await request.json();

  try {
    const response = await fetch("https://api.meshy.ai/v1/image-to-3d", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: imageUrl,
        enable_pbr: true,
        ai_model: "meshy-4",
        topology: "quad",
        target_polycount: 30000,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating 3D model:", error);
    return NextResponse.json(
      { error: "Failed to create 3D model" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.meshy.ai/v1/image-to-3d/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error polling task:", error);
    return NextResponse.json({ error: "Failed to poll task" }, { status: 500 });
  }
}
