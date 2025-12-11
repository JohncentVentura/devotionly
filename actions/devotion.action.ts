import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { getUserId } from "./user.action";

export async function getDevotions(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();
    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userDevotions = await prisma.devotions.findMany({
      where: whereClause,
    });

    //revalidatePath("/");
    return { success: true, userDevotions };
  } catch (error) {
    console.error("getDevotions error:", error);
  }
}

export async function getDevotionById(id: string) {
  return await prisma.devotions.findUnique({
    where: { id },
  });
}
