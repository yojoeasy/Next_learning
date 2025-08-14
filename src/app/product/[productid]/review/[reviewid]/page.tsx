// import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";   // best practice

export default async function ReviewDetail({ params }: { params: { productid: string, reviewid: string } }) {
  const { productid, reviewid } = await params;
  // if (parseInt(reviewid) > 1000) {
  //   return NotFound();
  // }
   if (parseInt(reviewid) > 1000) {
    return notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Review Detail</h1>
      <p>Details for product ID: {productid}</p>
      <p>Details for review ID: {reviewid}</p>
      <a href={`/product/${productid}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"><span>Back to Product Details</span></a>
    </div>
  );
}
