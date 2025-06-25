'use client'

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import ChapterTopicList from "../_components/ChapterTopicList";

function EditCourse() {

const { courseId } = useParams();
const [loading, setLoading] = useState(false);
const [course, setCourse] = useState();

useEffect(() => {
    getCourseInfo()
},[])

const getCourseInfo =async() => {
    setLoading(true);
    const result = await axios.get(`/api/courses?courseId=${courseId}`);

    setCourse(result.data);
    setLoading(false);
}
  return (
    <div><CourseInfo course={course}/>
    <ChapterTopicList course={course}/></div>
  )
}
export default EditCourse