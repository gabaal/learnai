import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';

import { GoogleGenAI, } from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';


const PROMPT = `Generate Learning Course depends on the following details in which make sure to add course name, description, chapter name, image prompt (create a modern, flat style 2d digital illustration representing the user topic. Include UI/UX elements such as mock-up screens, text blocks, icons, buttons and creative workspace tools. Add symbolic elements related to the user course, like sticky notes, design components and visual aids. Use a vibrant color palette (blues, purples and oranges) with a clean professional look. The illustration should feel creative, tech-savvy and educational, ideal for visualizing concept in the user course) for course banner in 3d format, topic under each chapter, duration for each chapter etc. in JSON format only
Schema: {
‘course’: {
		‘name’: ‘string’,
		‘description’: ‘string’,
		‘category’: ’string’,
		‘level’: ’string’,
		‘includeVideo’: ’boolean’,
‘noOfChapters’: ’number’,
'bannerImagePrompt': 'string',
‘chapter’: [
{
				‘chapterName’: ‘string’,
				‘duration’: ‘string’,
‘topics’: [
‘string’
],
‘imagePrompt’: ‘string’
					}
				]
}
}
,User Input:`
export async function POST(req) {
    const {courseId, ...formData} = await req.json()
const user = await currentUser()


    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.0-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: PROMPT + JSON.stringify(formData),
                },
            ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    console.log(response.candidates[0].content.parts[0].text);

    const RawResponse = response.candidates[0]?.content.parts[0]?.text
    const RawJson = RawResponse.replace('```json', '').replace('```', '')
    const JSONResp = JSON.parse(RawJson)

    // Generate Image
const imagePrompt = JSONResp.course?.bannerImagePrompt;
const bannerImageUrl = await GenerateImage(imagePrompt)
    // Save to DB

const result = await db.insert(coursesTable).values({
    ...formData,
    courseJson: JSONResp,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl: bannerImageUrl,
})

    return NextResponse.json({courseId: courseId})
}

const GenerateImage = async (imagePrompt) => {
    const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image)
return  result.data.image
}