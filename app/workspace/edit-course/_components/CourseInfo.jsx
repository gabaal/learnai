'use client'
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BookIcon, ClockIcon, Loader2Icon, PlayCircleIcon, SparkleIcon, TrendingUpIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

function CourseInfo({course, viewCourse}) {
    const courseLayout = course?.courseJson?.course
    const [loading,setLoading] = useState(false)
    const router = useRouter()

const GenerateCourseContent=async () => {
setLoading(true)
    try {
    const result = await axios.post('/api/generate-course-content', {
        courseJson:courseLayout,
         courseTitle: course?.name,
         courseId: course?.cid
})
    console.log(result.data)
    setLoading(false)
    toast.success("Course content generated successfully!")
    router.replace('/workspace')
    
}catch (error) {
    console.error("Error generating course content:", error);
    setLoading(false)
    toast.error("Failed to generate course content. Please try again later.")
    }
}
  return (
<div className=" flex-row lg:flex gap-5 justify-between p-5 rounded-2xl shadow">
    <div className="flex flex-col gap-3">
        <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
        <p className="line-clamp-2 text-gray-500">{courseLayout?.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                <ClockIcon className="text-blue-500" />
                <section>
                    <h2 className="font-bold">Duration</h2>
                    <h2>2 Hours</h2>
                </section>
            </div>

            <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                <BookIcon className="text-green-500" />
                <section>
                    <h2 className="font-bold">Chapters</h2>
                    <h2>{courseLayout?.noOfChapters}</h2>
                </section>
            </div>

            <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                <TrendingUpIcon className="text-red-500" />
                <section>
                    <h2 className="font-bold">Difficulty Level</h2>
                    <h2>{courseLayout?.level}</h2>
                </section>
            </div>
        </div>
        {!viewCourse ?
        <Button disabled={loading} onClick = {GenerateCourseContent}>{loading ? <Loader2Icon className="animate-spin"/> :
        <SparkleIcon/>} Generate Content</Button> : <Button><PlayCircleIcon/> Continue Learning</Button>}


    </div>
    <Image
        src={course?.bannerImageUrl} alt={'banner image'} width={400} height={400} className="rounded-2xl object-cover w-full h-[240px] mt-5 lg:mt-0 aspect-auto"/>
</div>
  )
}
export default CourseInfo