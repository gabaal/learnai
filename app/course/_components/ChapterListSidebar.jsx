'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext"
import { CheckCircleIcon } from "lucide-react"
import { useContext } from "react"


function ChapterListSidebar({ courseInfo }) {
    const course = courseInfo?.courses
    const enrollCourse = courseInfo?.enrollCourse
    const courseContent = courseInfo?.courses.courseContent
    const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext)
let completedChapter = enrollCourse?.completedChapters ?? []


    return (
        <div className="w-80 bg-secondary h-screen p-5">
            <h2 className="my-3 font-bold text-xl">Chapters ({courseContent?.length})</h2>

            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem value={chapter?.courseData?.chapterName} key={index}
                    onClick={()=> setSelectedChapterIndex(index)} >
                        <AccordionTrigger className={'font-medium text-lg'}>
                            <span>{!completedChapter.includes(index) ? index + 1 : <CheckCircleIcon className="text-green-600"/>}.</span>
                             {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div className="">
                                {chapter?.courseData?.topics.map((topic, index_) => (
                                    <h2 className={`p-3 rounded-lg my-1 ${completedChapter.includes(index) ? 'bg-green-100 text-gray-500' : 'bg-white '}`} key={index_}>{topic.Topic}</h2>
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