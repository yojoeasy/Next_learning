// "use client"

import Link from "next/link";
// import {use} from "react";

export default async function ArticlePage({ 
// export default function ArticlePage({ 
  params, 
  searchParams 
}: { 
  params: { articleid: string };
  searchParams: { [key: string]: string | string[] | undefined };
  // params: Promise<{ articleid: string }>;
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  // const { articleid } = use(params);
  // const { lang } = use(searchParams);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1>Article id: {resolvedParams.articleid}</h1>
      <h2>Reading language: {resolvedSearchParams.lang}</h2>
      {/* <h1>Article id: {articleid}</h1>
      <h2>Reading language: {lang}</h2> */}
        <ul>
            <li><Link href="/articles/breaking-news?lang=en">Read in English</Link></li>
            <li><Link href="/articles/breaking-news?lang=fr">Read in French</Link></li>
            <li><Link href="/articles/breaking-news?lang=es">Read in Spanish</Link></li>
        </ul> 
    </div>
  );
}
