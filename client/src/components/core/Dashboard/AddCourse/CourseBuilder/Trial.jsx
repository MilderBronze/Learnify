import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';

export const Trial = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editSection, setEditSection] = useState(false);
    const cancelEdit = () => {
        setEditSection(false);
        setValue("sectionName", "");
    }
    return (
        <div>
            <p>course builder</p>
            <form>
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
            
        </div>
    )
}
