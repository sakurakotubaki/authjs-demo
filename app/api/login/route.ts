import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Login attempt:', { email, password }); // デバッグ用ログ

    // ダミー認証（実際のアプリケーションではデータベースで検証する）
    if (email === "test@example.com" && password === "password") {
      const token = jwt.sign(
        {
          email,
          id: 1,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      console.log('Login successful:', { email, token }); // デバッグ用ログ

      return NextResponse.json({
        email,
        token,
      });
    }

    console.log('Login failed:', { email }); // デバッグ用ログ

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error); // デバッグ用ログ
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
