"use client"

import { usePostStore } from "@/store/postStore"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PenTool, Send, ArrowLeft, Loader2 } from "lucide-react"

const CreatePost = () => {
  const { createPost, loading } = usePostStore()
  const [post, setPost] = useState({ title: "", content: "" })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!post.title.trim() || !post.content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      await createPost(post.title, post.content)
      toast.success("Post created successfully!")
      setPost({ title: "", content: "" }) // Reset form
      router.push("/")
    } catch (error) {
      toast.error("Error creating post")
    }
  }

  const isFormValid = post.title.trim() && post.content.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PenTool className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
          </div>
          <p className="text-slate-600">Share your thoughts with the world</p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-slate-800">Post Details</CardTitle>
            <CardDescription className="text-slate-500">
              Fill in the information below to create your post
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Post Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={post.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title for your post..."
                  className="h-11 text-base border-slate-200 focus:border-primary focus:ring-primary"
                  disabled={loading}
                />
                <p className="text-xs text-slate-500">{post.title.length}/100 characters</p>
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-slate-700">
                  Post Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={post.content}
                  onChange={handleInputChange}
                  placeholder="Write your post content here... Share your ideas, experiences, or insights."
                  className="min-h-[200px] text-base border-slate-200 focus:border-primary focus:ring-primary resize-none"
                  disabled={loading}
                />
                <p className="text-xs text-slate-500">{post.content.length} characters</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 h-11 border-slate-200 text-slate-600 hover:bg-slate-50"
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white font-medium"
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Post...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Publish Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-6 border-slate-200 bg-slate-50/50">
          <CardContent className="pt-6">
            <h3 className="font-medium text-slate-800 mb-3">Writing Tips</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Keep your title clear and engaging to attract readers
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Structure your content with paragraphs for better readability
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Proofread your post before publishing
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreatePost
