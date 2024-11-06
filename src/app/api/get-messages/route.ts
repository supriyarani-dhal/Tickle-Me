import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await connectDB();

  const session = await getServerSession(options);
  const user = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  //the userId was in string format previously , so we have to convert that in it's orignal format
  const userId = new mongoose.Types.ObjectId((user as any)._id);

  try {
    const user = await userModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("An unexpected error occured: ", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting the messages",
      },
      {
        status: 500,
      }
    );
  }
}
