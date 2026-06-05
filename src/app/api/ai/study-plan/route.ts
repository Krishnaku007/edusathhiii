import { NextRequest, NextResponse } from "next/server";
import { differenceInDays } from "date-fns";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { examDate: string };

  if (!body.examDate) {
    return NextResponse.json({ error: "examDate is required" }, { status: 400 });
  }

  const days = Math.max(3, Math.min(30, differenceInDays(new Date(body.examDate), new Date())));

  const plan = Array.from({ length: Math.min(days, 14) }).map((_, index) => {
    const day = index + 1;
    const type = day % 4 === 0 ? "Revision" : day % 3 === 0 ? "Science" : day % 2 === 0 ? "Mathematics" : "Social Science";

    return {
      day,
      title: `${type} Focus`,
      tasks: [
        `Study chapter ${Math.max(1, Math.ceil(day / 2))}`,
        "Practice 10 concept questions",
        "5-minute self summary and recall",
      ],
    };
  });

  return NextResponse.json({ plan });
}
