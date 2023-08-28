"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";

import { RouterOutputs } from "@lec-workshop/api";

import { api } from "~/utils/api";

interface PostCardProps {
  post: RouterOutputs["post"]["all"][number];
}
export const PostCard = (props: PostCardProps) => {
  const context = api.useContext();
  const deletePost = api.post.delete.useMutation();

  return (
    <Card>
      <Flex align="center" justify={"between"}>
        <Box>
          <Text as="div" size="2" weight="bold">
            {props.post.title}
          </Text>
          <Text as="div" size="2" color="gray">
            {props.post.content}
          </Text>
        </Box>
        <button
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={async () => {
            await deletePost.mutateAsync(props.post.id);
            await context.post.all.invalidate();
          }}
        >
          Delete
        </button>
      </Flex>
    </Card>
  );
};
