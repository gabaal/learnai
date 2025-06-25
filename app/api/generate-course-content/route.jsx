import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic generate content for each topic in HTML and give response in JSON format.
Schema: {
chapterName:<>,
{
Topic:<>,
Content:<>
}
}
:User Input:
`


export async function POST(req) {
    const {courseJson, courseTitle, courseId} = await req.json()

    const promises = courseJson?.chapter?.map (async(chapter) => {
        const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

    const RawResponse = response.candidates[0]?.content.parts[0]?.text
    const RawJson = RawResponse.replace('```json', '').replace('```', '')
    const JSONResp = JSON.parse(RawJson)

    //GET youtube video
const youtubeData = await GetYoutubeVideo(chapter?.chapterName)

    return {
      youtubeVideo: youtubeData,
      courseData: JSONResp,
    }
})
const CourseContent = await Promise.all(promises)

//save to DB

const dbResp = await db.update(coursesTable).set({
  courseContent: CourseContent,
}).where(eq(coursesTable.cid, courseId))

return NextResponse.json({
    courseContent: CourseContent,
    courseName: courseTitle
})
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo =async (topic) => {
  const params = {
    part: 'snippet',
    q: topic,
    type: 'video',
    maxResults: 4,
    key: process.env.YOUTUBE_API_KEY,
  }

  const response = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoListResp = response.data.items
  const youtubeVideoList = []
  youtubeVideoListResp.forEach(item=> {
    const data = {
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      
    }
    youtubeVideoList.push(data)
  })
  console.log('YT video list: ',youtubeVideoList)
  return youtubeVideoList
}