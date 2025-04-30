import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Welcome to Chat App</h1>
        {!session ? (
          <Link 
            href="/api/auth/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign in to start chatting
          </Link>
        ) : (
          <Link 
            href="/chat"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Go to Chat
          </Link>
        )}
      </div>
    </div>
  );
}