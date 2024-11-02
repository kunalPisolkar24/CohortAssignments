import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "./LoadingSpinner";
import BannerImage from "../../assets/blogImages/banner.jpg";
interface Tag {
  id: number;
  name: string;
}

interface Blog {
  id: number;
  title: string;
  body: string;
  authorId: number;
  tags: {
    postId: number;
    tagId: number;
    tag: Tag;
  }[];
  author: {
    id: number;
    username: string;
    email: string;
  };
}

interface Author {
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

const ViewBlogPage: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get<Blog>('https://blogapp.kpisolkar24.workers.dev/api/posts/12');
        setBlog(response.data);
        setAuthor({
          name: response.data.author.username,
          email: response.data.author.email,
          avatar: '/placeholder.svg?height=128&width=128', // Placeholder avatar
          bio: 'Alex is a seasoned web developer and AI enthusiast with over a decade of experience in creating innovative digital solutions. He\'s passionate about exploring the intersection of AI and web technologies.'
        });
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  if (!blog || !author) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <img
          src= {BannerImage}
          alt="Blog banner"
          width={1200}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag.tag.id} variant="secondary" className="hover:bg-secondary/80 transition-colors">
                {tag.tag.name}
              </Badge>
            ))}
          </div>
        </main>

        <aside className="w-full md:w-1/3 md:max-w-xs">
          <Card className="sticky top-4">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="text-[40px]">{author.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl mb-1">{author.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{author.email}</p>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{author.bio}</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default ViewBlogPage;
