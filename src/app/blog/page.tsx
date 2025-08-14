export default function Blog() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <h1>Blog</h1>
      <p>Welcome to our blog! Here you'll find the latest news and updates.</p> */}
      <div className="space-y-8">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to Our Blog</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our blog! Here you'll find the latest news, updates, tutorials, 
            and insights from our team. We cover topics ranging from web development 
            to design trends and business strategies.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sample Blog Post 1 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Technology</span>
                <span className="text-gray-500 text-sm ml-auto">Jan 15, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                <a href="/blog/first" className="hover:text-blue-600 transition-colors">
                  Getting Started with Next.js
                </a>
              </h3>
              <p className="text-gray-600 mb-4">
                Learn the fundamentals of Next.js and how to build modern web applications 
                with React and server-side rendering.
              </p>
              <a href="/blog/first" className="text-blue-600 hover:text-blue-800 font-medium">
                Read More →
              </a>
            </div>
          </article>

          {/* Sample Blog Post 2 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Development</span>
                <span className="text-gray-500 text-sm ml-auto">Jan 10, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                <a href="/blog/second" className="hover:text-blue-600 transition-colors">
                  Advanced React Patterns
                </a>
              </h3>
              <p className="text-gray-600 mb-4">
                Explore advanced React patterns and techniques to write more maintainable 
                and scalable React applications.
              </p>
              <a href="/blog/second" className="text-blue-600 hover:text-blue-800 font-medium">
                Read More →
              </a>
            </div>
          </article>
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  
  );
}
