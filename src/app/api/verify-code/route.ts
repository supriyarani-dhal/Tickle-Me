import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { use } from "react";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { userName, code } = await request.json();

    //in next js, getting actual data from the params/url is very difficult
    //so we should decode the username
    const decodedUsername = decodeURIComponent(userName);
    const user = await userModel.findOne({ userName: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please sign up again to get a new code",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error in verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error in verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
