export default async function SecondBlogPost() {
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
  await new Promise((resolve) => setTimeout(() => resolve("Intentional delay"), 1000)); // Simulate loading
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-black">
      <h1>My Second Blog Post</h1>
      <p>This is the content of my second blog post!</p>
    </div>
  );
}
