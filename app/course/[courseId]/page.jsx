'use client'

import AppHeader from "@/app/workspace/_components/AppHeader"
import ChapterListSidebar from "../_components/ChapterListSidebar"
import ChapterContent from "../_components/ChapterContent"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

function Course() {
const {courseId} = useParams()
const [courseInfo, setCourseInfo] = useState()
    useEffect(() => {
        GetEnrolledCourseById()
    }, [])

    const GetEnrolledCourseById = async () => {
        const result = await axios.get('/api/enroll-course?courseId='+courseId)
        setCourseInfo(result.data)
        console.log(result.data)
    }

  return (
    <div>
        <AppHeader hideSidebar={true}/>
        <div className="flex gap-10">
            <ChapterListSidebar courseInfo={courseInfo}/>
            <ChapterContent courseInfo={courseInfo}/>
        </div>
    </div>
  )
}
export default Course