import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

export default async function page({ params }) {
  const { attemptId } = await params;
  const data = await fetch(
    process.env.NEXT_PUBLIC_API + `/attempt/${attemptId}`
  );
  const { data: attempt } = await data.json();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar attempt={attempt} />
      <div className="flex-1 p-3 md:p-6">
        <Header attempt={attempt} />
        <Content attempt={attempt} />
      </div>
    </div>
  );
}
