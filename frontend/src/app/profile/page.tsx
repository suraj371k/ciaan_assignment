"use client"

import { useAuthStore } from "@/store/authStore"
import { usePostStore } from "@/store/postStore"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {User, Mail, FileText, PlusCircle } from "lucide-react"
import PostCard from "@/components/PostCard"
import { useRouter } from "next/navigation"

const Profile = () => {
  const { user } = useAuthStore()
  const { getUserPosts, userPosts, loading, error, deletePost } = usePostStore()

  useEffect(() => {
    getUserPosts()
  }, [getUserPosts])

  const handleDeletePost = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId)
    }
  }

  const router = useRouter()

  useEffect(() => {
    if(!user){
      router.push('/login')
    }
  }, [user])

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded-lg w-48"></div>
                <div className="h-6 bg-gray-200 rounded w-64"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-lg text-gray-600">Manage your profile and share your thoughts</p>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2 px-6"
          >
            <PlusCircle className="h-5 w-5" />
            Create New Post
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-2xl bg-white backdrop-blur-sm rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-32 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <CardHeader className="relative -mt-16 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <Avatar className="h-32 w-32 border-6 border-white shadow-2xl mx-auto sm:mx-0">
                <AvatarImage src={"/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getInitials(user?.name || "")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left space-y-4 pt-4">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <User className="h-5 w-5 text-green-500" />
                      <span>Member since {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm font-semibold gap-2 rounded-full"
                  >
                    <FileText className="h-4 w-4" />
                    {userPosts.length} Posts Published
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="border-green-200 text-green-700 bg-green-50 px-4 py-2 rounded-full font-semibold"
                  >
                    ✓ Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <Separator className="mb-6" />
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-100">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                About Me
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-indigo-400">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {user?.bio || "Welcome to my profile! I'm excited to share my thoughts and connect with the community. Stay tuned for interesting posts and insights."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <h3 className="text-2xl font-bold text-gray-800 px-6 bg-white rounded-full py-2 shadow-sm border">
              My Posts
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          {userPosts.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300 rounded-2xl bg-white/50">
              <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="p-4 rounded-full bg-gray-100 mb-4">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h4>
                <p className="text-gray-500 mb-6 max-w-md">
                  Start sharing your thoughts with the world. Create your first post to get started!
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  Write Your First Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div key={post.id} className="transform transition-all duration-200 hover:scale-[1.02]">
                  <PostCard 
                    name={post.author.name} 
                    timeAgo={formatDate(post.createdAt)} 
                    title={post.title} 
                    content={post.content}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile