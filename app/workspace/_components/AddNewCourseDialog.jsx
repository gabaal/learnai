import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2Icon, SparkleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"



function AddNewCourseDialog({children}) {

const [loading, setLoading] = useState(false)
const router = useRouter()
const [formData, setFormData] = useState({
    'name': '',
    'description': '',
    'noOfChapters': 1,
    'includeVideo': false,
    'level': '',
    'category': '',
})
const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
        ...prev,
        [field]: value,
    }))
    console.log(formData)
  }

  const onGenerate = async () => {
    console.log(formData)
    const courseId = uuidv4()
    try {
    setLoading(true)
    const result = await axios.post('/api/generate-course-layout', {
      ...formData,
      courseId:courseId
    })
    console.log(result.data)
    setLoading(false)
    router.push(`/workspace/edit-course/`+result.data?.courseId)
  }
catch (e) {
    console.error('Error generating course:', e)
    setLoading(false)
  }
}

  return (
    <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course Using AI</DialogTitle>
      <DialogDescription asChild>
        <div className="flex flex-col gap-3 mt-3">
            <div>
                <label>Course Name</label>
                <Input placeholder='Course name...'
                onChange={(event) => onHandleInputChange('name', event?.target.value)}/>
            </div>

            <div>
                <label>Course Description (optional)</label>
                <Textarea placeholder='Course description...'
                onChange={(event) => onHandleInputChange('description', event?.target.value)}/>
            </div>
            <div>
                <label>No. Of Chapters</label>
                <Input type ='number' placeholder='Chapters...'
                onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)}/>
            </div>
            <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch onCheckedChange={()=>onHandleInputChange('includeVideo', !formData?.includeVideo)}/>
            </div>
            <div>
                <label className="mb-1">Difficulty Level</label>
                <Select onValueChange={(value) => onHandleInputChange('level', value)}>
      <SelectTrigger className="w-full mt-1">
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Difficulty</SelectLabel>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            <div>
                <label>Category</label>
                <Input placeholder='Category (seperated by comma)'
                onChange={(event) => onHandleInputChange('category', event?.target.value)}/>
            </div>
            <div className="mt-5">
<Button onClick={onGenerate} className={'w-full'} disabled={loading}>
  {loading ? <Loader2Icon className='animate-spin'/> :
  <SparkleIcon/>} Generate Course</Button>
        </div></div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}
export default AddNewCourseDialog