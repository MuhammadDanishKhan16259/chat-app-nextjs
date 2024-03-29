import "../mongodb";
import { NextRequest, NextResponse } from 'next/server';
import "dotenv/config";
import { userModel } from "../schema";

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {

        const id = new URL(req.url).searchParams.get("id");

        const userData = await userModel.findById(id).exec();

        if (!userData) {
            return NextResponse.json({
                error: "User not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: "User fetched successfully",
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                _id: userData._id,
                createdOn: userData.createdOn,
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "An unknown error occurred",
        }, { status: 500 });
    }
};