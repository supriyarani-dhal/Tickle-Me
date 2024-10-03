import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { userName, email, password } = await request.json();

    //case 1 - the user which is verified by userName
    const existingUserVerifiedByUserName = await userModel.findOne({
      userName,
      isVerified: true,
    });

    if (existingUserVerifiedByUserName) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    //case 2 - the user which have their email
    const existingUserByEmail = await userModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      //already verified by email
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 400 }
        );
      } else {
        //case 2 - user will be verified and then save the complete user details on database
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();
      }
    } else {
      //case 2(b) - verify the user by email
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new userModel({
        userName,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isMessageAccepting: true,
        messages: [],
      });

      await newUser.save();
    }

    //case 3 - email is not verified so send verification code through email
    const emailResponse = await sendVerificationEmail(
      email,
      userName,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully, please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to register user", error);

    return Response.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
