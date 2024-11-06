import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { User } from "next-auth";

export async function POST(request: Request) {
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

  const userId = (user as any)._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { isMessageAccepting: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accept messages",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to update user status to accept messages");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages",
      },
      {
        status: 500,
      }
    );
  }
}

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

  const userId = (user as any)._id;

  try {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        isMessageAccepting: foundUser.isMessageAccepting,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in getting message acceptance status");
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      {
        status: 500,
      }
    );
  }
}
