import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create
export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.genre.create({
      data: {
        name: name,
      },
    });
    res.status(200).send({
      message: "success create new genre",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      error: "Failed to create genre",
    });
  }
};

// get
export const getGenre = async (req: Request, res: Response) => {
  try {
    const result = await prisma.genre.findMany({
      include: {
        books: true,
      },
    });
    res.status(200).send({
      data: result,
      message: "success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Failed get genre",
    });
  }
};

// update
export const updateGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    const result = await prisma.genre.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ message: "Update genre success", data: result });
  } catch (error: any) {
    res.status(500).json({ message: "Update genre failed", error: error.message });
  }
};


// delete
export const deleteGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    await prisma.genre.delete({ where: { id } });
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete genre", error: error.message });
  }
};