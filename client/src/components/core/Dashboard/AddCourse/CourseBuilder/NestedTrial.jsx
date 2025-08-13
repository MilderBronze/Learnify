import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiSolidDownArrow } from 'react-icons/bi';

export const NestedTrial = ({ handleChangeEditSectionName }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const token = useSelector((state) => state.auth);
    const course = useSelector((state) => state.course);
    // there are 3 modes ... adding lecture, viewing lecture and editing lecture.
    const [addSubSection, setAddSubSection] = useState(false);
    const [viewSubSection, setViewSubSection] = useState(false);
    const [editSubSection, setEditSubSection] = useState(false);

    const [confirmationModal, setConfirmationModal] = useState(false);
    return (
        <div>
            <div>
                {course?.courseContent?.map((section) => {
                    <details key={section._id} open>
                        <summary>
                            <div>
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>
                            <div>
                                <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit />
                                </button>
                                <button onClick={() => setConfirmationModal({
                                    text1: "Delete Section",
                                    text2: "Are you sure you want to delete this section?",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                })}>
                                    <RiDeleteBin6Line />
                                </button>
                                <span>|</span>
                                <BiSolidDownArrow />
                            </div>
                        </summary>
                        <div>
                            {
                                section.subSection.map((data) => {
                                    <div key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                    >
                                        <div>
                                            <p>data.title</p>
                                        </div>
                                        <div>
                                            <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}></button>
                                            <button></button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </details>
                })}
            </div>
        </div>
    )
}
