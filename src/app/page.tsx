"use client";

import { useSession } from "@/providers/SessionProvider";

export default function Home() {
  const { session, signOut } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl font-bold">Trang chủ</h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
        <div className="rounded-lg border border-gray-300 p-8">
          <h2 className="mb-4 text-2xl font-semibold">Thông tin người dùng</h2>
          {session ? (
            <div>
              <p><strong>ID:</strong> {session.user.id}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Tên:</strong> {session.user.name}</p>
              <p><strong>Vai trò:</strong> {session.user.roleCode}</p>
              <button
                onClick={() => signOut()}
                className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <p>Đang tải thông tin...</p>
          )}
        </div>
      </div>
    </main>
  );
}