import React from 'react'
import { useSelector } from 'react-redux'

function Trial({handleChangeEditSectionName}) {
  const {course} = useSelector((state) => state.course)
  return (
    <div>
      {
        course.courseContent.map((section)=>(
          <details key={section._id} open>
            <summary>
              <div>
                <p>{section.sectionName}</p>
              </div>
              <div>
                <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}></button>
              </div>
            </summary>
          </details>
        ))
      }
    </div>
  )
}

export default Trial