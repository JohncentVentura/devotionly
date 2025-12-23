"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "../lib/generated/prisma/client";
import prisma from "../lib/prisma";
import { getUserId } from "./user.action";

export async function getDevotions(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export async function createDevotion(data: Prisma.DevotionsCreateInput) {
  try {
    const currentUserId = await getUserId();

    if (!currentUserId) return;

    const newDevotion = await prisma.devotions.create({
      data: {
        ...data,
        userId: currentUserId,
        //id will be auto-generated
      },
    });

    revalidatePath("/devotions");
    return newDevotion;
  } catch (error) {
    console.error("Error creating devotion:", error);
    throw error;
  }
}

export async function updateDevotion(
  id: string, //identify which devotion we are editing
  data: Prisma.DevotionsUpdateInput
) {
  try {
    const currentUserId = await getUserId();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedDevotion = await prisma.devotions.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/devotions");
  } catch (error) {
    console.error("Error updating devotion:", error);
    throw error;
  }
}

export async function deleteDevotion(
  id: string //identify which devotion we are deleting
) {
  try {
    const currentUserId = await getUserId();

    if (!currentUserId) return;

    const deletedDevotion = await prisma.devotions.delete({
      where: { id },
    });

    revalidatePath("/devotions");
    return deletedDevotion;
  } catch (error) {
    console.error("Error deleting devotion:", error);
    throw error;
  }
}
