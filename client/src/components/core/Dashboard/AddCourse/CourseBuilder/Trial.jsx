import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import IconBtn from "../../../../Common/IconBtn"

export default function Trial() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm()

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }
  const { course } = useSelector((state) => state.course)
  const isFormUpdated = () => {
    const currentValues = getValues()
    if (currentValues.sectionName !== course.courseContent.sectionName) {
      // meaning the values in the form have changed after editing... because there is mismatch between the last submitted form and the current value of the form.
      return true;
    }
    return false;
  }
  const onSubmit = async (data) => {
    setLoading(true)
    if (editSectionName) {
      if (isFormUpdated) {
        let result = await updateSection({})
      }
    }
  }

  const [editSectionName, setEditSectionName] = useState(null)
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <p>course builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Section Name</label>
          <input
            type="text"
            placeholder="add a section to build your course"
            id="sectionName"
            name="sectionName"
            disabled={loading}
            {...register("sectionName", { required: true })}
          />
          {errors["sectionName"] && <span>section name is required</span>}
        </div>
        <div>
          <IconBtn
            type="submit"
            disabled={loading}
            outline={true}
            text={editSectionName ? "edit section Name" : "create section"}
          ></IconBtn>
          {editSectionName && (
            <button type="button" onClick={cancelEdit}>
              cancel edit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
