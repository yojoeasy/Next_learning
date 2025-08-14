export default async function DocPage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;

    if (slug?.length === 1) {
        return(
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1>Viewing docs for feature {slug[0]}</h1>
            </div>
        );
    } else if (slug?.length === 2) {
        return(
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1>Viewing docs for feature {slug[0]} and concept {slug[1]}</h1>
            </div>
        );
    } else if (slug?.length === 3) {
        return(
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1>Viewing docs for feature {slug[0]} and concept {slug[1]} and topic {slug[2]}</h1>
            </div>
        );
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
        <h1>Documentation</h1>
        <p>Welcome to the documentation page!</p>
        {/* <p>Details for document: {slug.join('/')}</p> */}
        </div>
    );
}