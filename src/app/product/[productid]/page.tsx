// import NotFound from "@/app/not-found";
import {notFound , redirect} from "next/navigation";  // best pratice
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { productid: string }}): Promise<Metadata> {
  const { productid } = await params;
  return {
    title: `Product ${productid}`,
    description: `Details about product ${productid}`,
  };
}


export default async function ProductDetail({ params }: { params: { productid: string}}) {
  const { productid } = await params;
  if (parseInt(productid) > 1000) {
      // return notFound(); // Returns 404 status
      redirect("/product"); // Returns 307 status
      // permanentRedirect("/product"); // Returns 301 status
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Product Detail</h1>
      <p>Details for product ID: {productid}</p>
      <p>Check out the reviews for this product!</p>
      <ul>
        <li>
          <a href={`/product/${productid}/review/1`}>Review 1</a>
        </li>
        <li>
          <a href={`/product/${productid}/review/2`}>Review 2</a>
        </li>
        <li>
          <a href={`/product/${productid}/review/3`}>Review 3</a>
        </li>
      </ul>
      <a href={`/product`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"><span>Back to Product</span></a>
    </div>
  );
}
