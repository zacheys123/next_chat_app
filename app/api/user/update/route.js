import { connectDb } from "@/lib/connectDb";
import User from "@/models/user";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    firstname,
    secondname,
    instrument,
    experience,
    age,
    city,
    phone,
    email2,
    other,
  } = await req.json();

  try {
    await connectDb();
    if (
      !firstname ||
      !secondname ||
      !instrument ||
      !experience ||
      !age ||
      !city ||
      !phone ||
      !email2 ||
      other
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 403 }
      );
    }
    const user = await User.findByIdAndUpdate(id, {
      firstname,
      secondname,
      instrument,
      experience,
      age,
      city,
      phone,
      email2,
      other,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Dat Successfully Entered",
      },
      { status: 200 }
    );
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
