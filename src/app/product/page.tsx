import Link from 'next/link';

export default function Product() {
  const ProductId = 100;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold">Product</h1>
      <ul>
        <li><a href="/product/1">Product 1</a></li>
        <li><a href="/product/2">Product 2</a></li>
        <li><a href="/product/3">Product 3</a></li>
        <li><Link href={`/product/4`}>Product 4</Link></li>
        <li><Link href={`/product/${ProductId}`}>Product {ProductId}</Link></li>
      </ul>
    </div>
  );
}
