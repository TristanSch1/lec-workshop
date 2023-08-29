"use client";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
    title: z.string().max(255),
    content: z.string(),
});

export function CreatePostForm() {
  const context = api.useContext();

  const { control, handleSubmit } = useForm({
      resolver: zodResolver(postSchema)
  });

  const { mutateAsync: createPost, error } = api.post.create.useMutation({
    async onSuccess() {
      await context.post.all.invalidate();
    },
  });

  return (
    <form
      className="flex w-full max-w-2xl flex-col"
      onSubmit={handleSubmit(async (data) => {
          const {title, content} = data;
          await createPost({
              title,
              content,
          });
          await context.post.all.invalidate();
      })}
    >
        <Controller
            control={control}
            render={({ field }) => {
            return (
                <input
                    className="mb-2 rounded bg-white/10 p-2 text-white"
                    {...field}
                    placeholder="Title"
                />
            )
        }} name={"title"} />
      {error?.data?.zodError?.fieldErrors.title && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}
        <Controller
            control={control}
            render={({ field }) => {
            return (
                <>
                    <input
                        {...field}
                        className="mb-2 rounded bg-white/10 p-2 text-white"
                        placeholder="Content"
                    />
                </>
            )
        }} name={"content"} />
      {error?.data?.zodError?.fieldErrors.content && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </span>
      )}
      {}
      <button type="submit" className="rounded bg-pink-400 p-2 font-bold">
        Create
      </button>
      {error?.data?.code === "UNAUTHORIZED" && (
        <span className="mt-2 text-red-500">You must be logged in to post</span>
      )}
    </form>
  );
}

export function PostList() {
  const [posts] = api.post.all.useSuspenseQuery();

  if (posts.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No posts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((p) => {
        return <PostCard key={p.id} post={p} />;
      })}
    </div>
  );
}

export function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
}) {
  const context = api.useContext();
  const deletePost = api.post.delete.useMutation();

  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{props.post.title}</h2>
        <p className="mt-2 text-sm">{props.post.content}</p>
      </div>
      <div>
        <button
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={async () => {
            await deletePost.mutateAsync(props.post.id);
            await context.post.all.invalidate();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2
          className={`w-1/4 rounded bg-pink-400 text-2xl font-bold ${
            pulse && "animate-pulse"
          }`}
        >
          &nbsp;
        </h2>
        <p
          className={`mt-2 w-1/3 rounded bg-current text-sm ${
            pulse && "animate-pulse"
          }`}
        >
          &nbsp;
        </p>
      </div>
    </div>
  );
}
