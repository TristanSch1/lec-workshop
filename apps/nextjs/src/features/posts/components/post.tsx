const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people/1");
  return res.json();
};

export const Post = async () => {
  const data = await fetchPeople();
  return <div>{data?.name}</div>;
};
