import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const SubSectionModalTrial = (
  { modalData, setModalData, add = false, view = false, edit = false }
) => {
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (add) {
      setValue("lectureTitle", "");
      setValue("lectureDescription", "");
      setValue("lectureVideo", "");
    }
    if (view || edit) {
      // meaning ki if either of these 2 flags are true, then it means we have to prefill the form.
      // view ya edit tab hii kar paoge jab subsection bana pada hoga..
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [modalData, add, view, edit]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    const title = currentValues.lectureTitle;
    const description = currentValues.lectureDesc;
    const videoUrl = currentValues.lectureVideo;
    // ye aa gye tumhare form ke values.
    if (title !== modalData.title || description !== modalData.description || videoUrl !== modalData.videoUrl) {
      return true;
    }
    return false;
  }
  const onSubmit = async (data) => {

    if (view) {
      return;
    }
    if (edit) {
      // we check if form is updated or not:
      if (!isFormUpdated()) {
        toast.error("No changes made");
        return;
      }
    }
    console.log(data);
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoUrl", data.lectureVideo);
    const result = await relevantApiCall(passtherequiredobject);
    console.log(result);
    if (result) {
      toast.success("Lecture added successfully");
    }
    else return toast.error("Something went wrong, try again later");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="lectureTitle">Lecture Title</label>
            <input type="text" id="lectureTitle" {...register("lectureTitle")} />
          </div>
        </div>
      </form>
    </div>
  )
}
