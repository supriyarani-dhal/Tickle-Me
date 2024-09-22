import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { Message } from "@/models/user.model";

export async function POST(request: Request) {
  await connectDB();
  const { userName, content } = await request.json();

  try {
    const user = await userModel.findOne({ userName });
    if (!user) {
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

    //check, is user accepting the messages or not
    if (!user.isMessageAccepting) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        {
          status: 403,
        }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in sending the messages: ", error);
    return Response.json(
      {
        success: false,
        message: "Error in sending the messages",
      },
      {
        status: 500,
      }
    );
  }
}
