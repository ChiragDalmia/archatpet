import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelUrl = searchParams.get("url");

  if (!modelUrl) {
    return NextResponse.json(
      { error: "No model URL provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(modelUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": 'attachment; filename="model.glb"',
      },
    });
  } catch (error) {
    console.error("Error fetching model:", error);
    return NextResponse.json(
      { error: "Failed to fetch model" },
      { status: 500 }
    );
  }
}
