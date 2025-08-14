"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || (pathname.startsWith(path) && path !== "/");
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            My App
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className={`hover:text-blue-200 transition-colors ${isActive("/") ? "text-black" : ""}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={`hover:text-blue-200 transition-colors ${isActive("/about") ? "text-red-500" : ""}`}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`hover:text-blue-200 transition-colors ${isActive("/blog") ? "text-red-500" : ""}`}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/product" className={`hover:text-blue-200 transition-colors ${isActive("/product") ? "text-red-500" : ""}`}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/login" className={`hover:text-blue-200 transition-colors ${isActive("/login") ? "text-red-500" : ""}`}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
