import { Suspense } from "react";

import { PostCardSkeleton, PostList } from "~/features/posts";
import { AuthShowcase } from "./_components/auth-showcase";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#6A09FD] to-[#2A0176] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[#F2C606]">LEC</span> Workshop
        </h1>
        <AuthShowcase />
        {/* TODO: composant create-post-corm */}
        <div className="h-[40vh] w-full max-w-2xl overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
