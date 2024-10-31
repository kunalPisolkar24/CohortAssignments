import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard'; // Import your BlogCard component
import Image1 from "../../assets/blogImages/one.jpg";
import Image2 from "../../assets/blogImages/two.jpg";
import Image3 from "../../assets/blogImages/three.jpg";
import Image4 from "../../assets/blogImages/four.jpg";
import Image5 from "../../assets/blogImages/five.jpg";
import Image6 from "../../assets/blogImages/six.jpg";

interface Tag {
  postId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
  };
}

interface Author {
  id: number;
  username: string;
  email: string;
}

interface BlogPost {
  id: number;
  title: string;
  body: string;
  authorId: number;
  tags: Tag[];
  author: Author;
}

interface FormattedBlogPost {
  title: string;
  snippet: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
  slug: string;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const BlogList: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<FormattedBlogPost[]>([]);
  const arr = [Image1, Image2, Image3, Image4, Image5, Image6];
  shuffleArray(arr);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<BlogPost[]>('https://blogapp.kpisolkar24.workers.dev/api/posts');
        const data = response.data;
        const formattedBlogs: FormattedBlogPost[] = data.map(post => ({
          title: post.title,
          snippet: post.body.substring(0, 100) + '...', // Truncate the body to create a snippet
          author: {
            name: post.author.username,
            avatarUrl: `https://i.pravatar.cc/150?img=${post.authorId}`, // Use a placeholder avatar URL
          },
          tags: post.tags.map(tag => tag.tag.name),
          slug: `post-${post.id}`, // Create a slug based on the post ID
        }));
        setBlogPosts(formattedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xs:m-[15px] sm:mt-[200px] sm:m-[20px] lg:mt-[200px] lg:m-[40px] md:m-[30px] md:mt-[200px] mt-[200px] lg:grid-cols-1 gap-6 m-6 max-w-7xl lg:mx-auto">
      {blogPosts.map((post, index) => (
        <BlogCard imageUrl={arr[index % arr.length]} key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default BlogList;
