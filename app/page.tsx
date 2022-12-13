import { categories } from "../constants";
import fetchNews from "../utils/fetchNews";

async function HomePage() {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(","));

  console.log(news);

  return <div>{/* NewsList news */}</div>;
}

export default HomePage;
