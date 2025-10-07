import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getPostsDirectoryByLocale(locale: string): string {
  const baseDir = path.join(process.cwd(), "content/blog");
  const localizedDir = path.join(baseDir, locale);
  // Fallback to English if the requested locale directory does not exist
  return fs.existsSync(localizedDir) ? localizedDir : path.join(baseDir, "en");
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  content: string;
}

export function getAllPosts(locale: string = "en"): BlogPost[] {
  const postsDirectory = getPostsDirectoryByLocale(locale);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt,
        date: matterResult.data.date,
        author: matterResult.data.author,
        tags: matterResult.data.tags || [],
        featured: matterResult.data.featured || false,
        coverImage: matterResult.data.coverImage,
        content: matterResult.content,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(locale: string, slug: string): BlogPost | null {
  try {
    const postsDirectory = getPostsDirectoryByLocale(locale);
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      date: matterResult.data.date,
      author: matterResult.data.author,
      tags: matterResult.data.tags || [],
      featured: matterResult.data.featured || false,
      coverImage: matterResult.data.coverImage,
      content: matterResult.content,
    };
  } catch (error) {
    return null;
  }
}

export function getFeaturedPosts(locale: string = "en"): BlogPost[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter((post) => post.featured);
}

export function getPostsByTag(locale: string, tag: string): BlogPost[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter((post) => post.tags.includes(tag));
}
