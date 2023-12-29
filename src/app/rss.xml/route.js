import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import { format } from "date-fns";
import RSS from "rss";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  const posts = await getBlogPostList();
  const feed = new RSS({
    title: BLOG_TITLE,
    description: "Your weekly dose of trends on web.",
  });
  posts.forEach(({ title, abstract: description, publishedOn: date }) =>
    feed.item({
      title,
      description,
      date,
    })
  );
  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
