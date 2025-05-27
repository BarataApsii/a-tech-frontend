import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const revalidate = 0

async function getNewsItems() {
  const posts = await prisma.post.findMany({
    where: {
      type: "NEWS",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  return posts
}

export default async function AdminNewsPage() {
  const news = await getNewsItems()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Management</h1>
        <Button asChild>
          <Link href="/admin/news/create">Create News</Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category?.name || "Uncategorized"}</TableCell>
                <TableCell>{item.author.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.published 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {item.published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/news/${item.id}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 