import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
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

  try {
    const updateResult = await userModel.updateOne(
      { _id: user.id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount) {
      return Response.json(
        {
          success: false,
          message: "Message not found or have already deleted",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in deleteing message", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      {
        status: 500,
      }
    );
  }
}
