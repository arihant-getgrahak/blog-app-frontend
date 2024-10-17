import Link from "next/link";
export default function Home() {
  return (
    <div className="text-center p-10">
      <h1>Welcome to our Blog App</h1>
      <p>This is the homepage.</p>
      <p>
        Want to access Blogs?? <Link className="underline text-blue-700" href="/blog">Click Here</Link>
      </p>
      <p>To know other Route click here <Link className="underline text-blue-700" href="https://github.com/arihant-getgrahak/blog-app-frontend" target="_blank">Github Link</Link> </p>
    </div>
  );
}
