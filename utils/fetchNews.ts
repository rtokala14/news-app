import { gql } from "graphql-request"
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    // GraphQL query
    const query = gql`
    query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
    )   {
        myQuery(
            access_key: $access_key
            categories: $categories
            countries: "us"
            sort: "published_desc"
            keywords: $keywords
        ) {
        data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
        }
        pagination {
            count
            limit
            offset
            total
        }
        }
    }
    `;

    // Fetch function with next13 caching
    const res = await fetch('https://jaguaruana.stepzen.net/api/viable-condor/__graphql', {
        method: 'POST',
        cache: isDynamic ? 'no-cache' : 'default',
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            }
        })
    })

    console.log(
        'Loading new data for categories',
        category,
        keywords
    )

    const NewsResponse = await res.json()

    // Sort function by images vs no images
    const news = sortNewsByImage(NewsResponse.data.myQuery)

    // return result
    return news
}

export default fetchNews

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=edf4ceac50e84ec6dfb5aa11b58dd48d"