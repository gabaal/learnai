'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext"
import { useContext } from "react"


function ChapterListSidebar({ courseInfo }) {
    const course = courseInfo?.courses
    const enrollCourse = courseInfo?.enrollCourse
    const courseContent = courseInfo?.courses.courseContent
    const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext)
    return (
        <div className="w-80 bg-secondary h-screen p-5">
            <h2 className="my-3 font-bold text-xl">Chapters ({courseContent?.length})</h2>

            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem value={chapter?.courseData?.chapterName} key={index}
                    onClick={()=> setSelectedChapterIndex(index)} >
                        <AccordionTrigger className={'font-medium text-lg'}>{index + 1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div className="">
                                {chapter?.courseData?.topics.map((topic, index) => (
                                    <h2 className="p-3 rounded-lg bg-white my-1" key={index}>{topic.Topic}</h2>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
        </div>
    )
}
export default ChapterListSidebar