export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Blog</h1>
          <p className="text-xl text-center text-blue-100">
            Insights, tutorials, and updates from our team
          </p>
        </div>
      </div>

      {/* Blog Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>

          {/* Blog Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      Technology
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      Design
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      Business
                    </a>
                  </li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Posts</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/blog/first" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Getting Started with Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/blog/second" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Advanced React Patterns
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">React</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Next.js</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">JavaScript</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
