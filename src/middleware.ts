import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  // Nếu đã đăng nhập và đang truy cập trang đăng nhập, chuyển hướng về trang chủ
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu chưa đăng nhập và đang truy cập trang yêu cầu xác thực, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các đường dẫn sau
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};