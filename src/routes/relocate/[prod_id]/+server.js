export async function GET({ params }) {
    const { prod_id } = params;
    
    // Get Product URL from DB

    const prodUrl = "https://www.amazon.com/dp/B0DHJ9SCJ4";
    
    return new Response(null, {
        status: 301,
        headers: {
            Location: prodUrl
        }
    });
}
