import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

export const Trial = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editSection, setEditSectionId] = useState(false);
    const token = useSelector((state) => state.auth);
    const course = useSelector((state) => state.course);
    const cancelEdit = () => {
        setEditSectionId(false);
        setValue("sectionName", "");
    }
    const dispatch = useDispatch();
    const goBack = () => {
        // jab step 1 se 2 pe gye toh course create ho gyi hogi and ab jab back pe daba ke wapas aana chah rhe ho.. toh ab ham course ko edit kr rhe honge toh editcourse wala flag ko true kr do and step 1 ke form ke saare elements ko bhar do with the previously filled values.
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    const goToNext = () => {
        // aage badhne se pehle make sure ki we have atleast one section and atleast one lecture in each section.
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        // if everything is good, then agle step pe chale jao
        dispatch(setStep(3));
    }
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        // ya toh course name update hoga or ya toh new course create hoga.
        setLoading(true);
        let result;
        if (editSection) {
            // we are editing the section name
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSection,
                courseId: course._id,
            }, token)
        }
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }
        // update values
        // meaning, ki if we created a course or edited a section, toh section toh course ke andar hii ata hai. so we update the course as well.
        if (result) {
            dispatch(setCourse(result))
            setEditSectionId(null);
            setValue("sectionName", "");
        }
        setLoading(false);
    }
    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSection === sectionId) {
            // setEditSectionId(null);
            // setValue("sectionName", "");
            cancelEdit();
        }
        else {
            setEditSectionId(sectionId);
            setValue("sectionName", sectionName);
        }
    }
    return (
        <div>
            <p>course builder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>section name <sup>*</sup></label>
                    <input type="text"
                        id='sectionName'
                        placeholder='add section name'
                        {...register("sectionName", { required: true })}
                        className='w-full'
                    />
                    {errors.sectionName && (
                        <span>section name is required</span>
                    )}
                </div>
                <div>
                    <IconBtn
                        type="submit"
                        text={editSection ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        customClasses="text-white"
                    />
                    {editSection && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                        >Cancel Edit</button>
                    )}
                </div>
            </form>
            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                )
            }
            <div>
                <button onClick={goBack}>back</button>
                <IconBtn text={"next"} onClick={goToNext} />
            </div>
        </div>
    )
}
