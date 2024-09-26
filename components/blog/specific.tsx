"use client";
import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";
import "./specific.css";
import { AuthorDetails } from "../authorDetail";
import CommentPage from "../comment";

interface Blog {
  id: string;
  title: string;
  description: string;
  created_at: string;
  slug: string;
  image: string;
  photo: string;
  users: {
    name: string;
    type: string;
    email: string;
  };
}

function formattedDate(date: any) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export const SpecificBlog = (props: { id: string }) => {
  const { id } = props;
  const [blog, setBlog] = useState<Blog>();
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setBlog(res?.data?.data);
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      // alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div id="page-body" className="max-w-[1280px] my-0 mx-auto">
          <div id="center" className="w-full">
            <main>
              <div
                className={`title font-mono ${
                  blog?.photo ? "text-white bg-contain" : "text-black"
                }`}
                style={{
                  backgroundImage: blog?.photo ? `url(${blog.photo})` : "none",
                }}
              >
                <p className="ml-4 mb-4 text-3xl font-serif capitalize">
                  {blog?.title}
                </p>
              </div>
              <div className="ml-4 mt-4 text-base font-serif  flex justify-between">
                <div>{formattedDate(blog?.created_at)}</div>
                <div>Rating: 4.5</div>
              </div>
              <div className="content">
                <p>{blog?.description}</p>
              </div>
              <div className="mb-10">
                <AuthorDetails
                  name={blog?.users?.name!}
                  email={blog?.users?.email!}
                />
              </div>
              <CommentPage id={blog?.id} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
