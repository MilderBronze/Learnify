import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import IconBtn from "../../../../Common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()
  const [dbSectionName, setDbSectionName] = useState("")

  // fixed: Now returns boolean instead of being treated as a reference
  const isFormUpdated = () => {
    const currentValues = getValues()
    return currentValues.sectionName !== dbSectionName
  }

  // handle form submission
  const onSubmit = async (data) => {
    if (!isFormUpdated()) {
      // fixed: calling function properly
      // wf:
      /**
     * 
you click on a section edit icon, toh uska id and name pass ho gya inside handleeditfn.
fiir maine ek state variable bana liya
and handleeditfn ke andar state variable ki value set kr di.
so ab i know what was the name of the section to be edited.
var name is dbSectionName.
ab user form me kuch change krega ya nai krega...
ye cheez tb check hogi jab user form submit krega..
so onsubmit fn pe jaake we need to check for this.
how will we check?
if val inserted by the user is different from dbSectionName.
if that is the scenario.. then cool. let the form update.
otherwise.. show toast.error.

     */
      toast.error("Nothing seems changed!")
      return
    }

    setLoading(true)
    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // if (editSectionName === sectionName) {
    //   cancelEdit()
    //   return
    // }
    /**
     This code block is checking whether the section name that you're trying to edit is already the same as the one that's currently being edited. Here's what it's doing line by line
     */
    setDbSectionName(sectionName)
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }
  // its like ... there would be various sections and all of them are gonna have the edit button tool.
  // so why not create a reusable component for that and render it for all the coursecontents by using map.. and pass this fn to that component.
  // then, all you've gotta do is.. inside of the component, pass the id of that particular component and you are done.
  // the logic of that function would reside in the parent component and all the child components would use that fn logic. crazy innit!?

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        // courseContent is nothing but the sections in a specific course.
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}
