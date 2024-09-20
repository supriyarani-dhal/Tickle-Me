import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signupSchema";

const usernameQuerySchema = z.object({
  userName: userNameValidation,
});

export async function GET(request: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    //get our required field(in an object form) from the entile url
    const queryParam = {
      userName: searchParams.get("userName"),
    };

    //validate the queryParam object with zod
    //the safeParse() checks whether the queryParam safely passes through the usernameQuerySchema or not.
    const result = usernameQuerySchema.safeParse(queryParam);
    console.log(result); //TODO: remove

    if (!result.success) {
      const usernameErrors = result.error.format().userName?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }

    const { userName } = result.data;
    const existingVerifiedUser = await userModel.findOne({
      userName,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in checking username is unique", error);
    return Response.json(
      {
        success: false,
        message: "Error in checking username is unique",
      },
      {
        status: 500,
      }
    );
  }
}
