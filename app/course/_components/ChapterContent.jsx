'use client'

import { Button } from "@/components/ui/button"
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext"
import axios from "axios"
import { CheckCircleIcon, CrossIcon, Loader2Icon, X } from "lucide-react"
import { useParams } from "next/navigation"
import { useContext, useState } from "react"
import YouTube from "react-youtube"
import { toast } from "sonner"

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams()
  const course = courseInfo?.courses
  const enrollCourse = courseInfo?.enrollCourse
  const courseContent = courseInfo?.courses.courseContent
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics
  let completedChapter = enrollCourse?.completedChapters ?? []
const [loading, setLoading] = useState(false)

  const markChapterCompleted = async () => {
    setLoading(true)
    completedChapter.push(selectedChapterIndex)
    const result = await axios.put('/api/enroll-course', {
      courseId: courseId,
      completedChapter: completedChapter
    })
    console.log(result)
    toast.success("Chapter marked as completed")
    setLoading(false)
    refreshData()
  }

  const markChapterIncomplete = async () => {
    setLoading(true)
    const completeChap = completedChapter.filter(item=>item!=selectedChapterIndex) 
    const result = await axios.put('/api/enroll-course', {
      courseId: courseId,
      completedChapter: completeChap
    })
    console.log(result)
    
    toast.success("Chapter marked as incomplete")
    setLoading(false)
    refreshData()
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
        {!completedChapter?.includes(selectedChapterIndex) ? <Button disabled={loading} onClick={() => markChapterCompleted()}>{loading? <Loader2Icon className="animate-spin"/> : <CheckCircleIcon />} Mark as completed</Button> :
          <Button disabled={loading} onClick={() => markChapterIncomplete()} variant="outline">
            {loading? <Loader2Icon className="animate-spin"/> :<X />} Mark Incomplete</Button>}
          
      </div>
      <h2 className="my-2 font-bold text-lg">Related Videos🎬</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {videoData?.map((video, index) => index <= 2 && (
          <div key={index}>
            <YouTube
              videoId={video.videoId}
              opts={{
                height: '250',
                width: '400',

              }} />
          </div>
        ))}
      </div>

      <div className="mt-7">
        {topics?.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl">{index + 1}. {topic?.Topic}</h2>
            <div dangerouslySetInnerHTML={{ __html: topic?.Content }}
              style={{
                lineHeight: '2.5'
              }}></div>
          </div>
        ))}
      </div>

    </div>
  )
}
export default ChapterContent