import { Post } from "~/features/posts/components/post";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people/1");
  return res.json();
};
const Page = async () => {
  const data = await fetchPeople();
  return (
    <div>
      {data.name}
      <Post />
    </div>
  );
};

export default Page;
