import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../slices/courseSlice';
import {RiMenuUnfoldLine} from 'react-icons/ri';
import { MdDelete, MdEdit } from 'react-icons/md';
import ConfirmationModal from '../../../../components/Common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../services/AuthApi/CourseApi';
import {AiFillCaretDown} from 'react-icons/ai';
import {FaPlus} from 'react-icons/fa';
import {RxDropdownMenu} from 'react-icons/rx';
import SubSectionModal from './SubSectionModal';

const NestedView = ({handleEditSectionName}) => {
    const{course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const[addSubSection,setAddSubSection]=useState(null);
    const[viewSubSection,setViewSubSection]=useState(null);
    const[editSubSection,setEditSubSection]=useState(null);

    const [confirmationModal,setConfirmationModal]=useState(null);

    async function handleDeleteSection(sectionID){
        const result=await deleteSection({
            sectionID,
            courseID:course._id},
            token
        )

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    async function handleDeleteSubSection(subSectionID,sectionID){
        const result=await deleteSubSection({subSectionID,sectionID},token);
        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>
            section._id===sectionID? result : section);

            const updatedCourse={...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);        
    }

  return (
    <div className='bg-richblack-700 p-6 rounded-md mt-7 mb-7  '>

      {
        course?.courseContent?.map((section,index)=>(
        <details key={section?._id} open>
            <summary  className='flex justify-between border-b-[1px] border-richblack-200'>
                    <div className='flex items-center gap-1'>
                        <RiMenuUnfoldLine/>
                        <p>{section.sectionName}</p>
                    </div>

                    <div className='flex item-baseline gap-2'>
                        <button
                        onClick={()=>handleEditSectionName(
                            section._id,
                            section.sectionName
                        )}                                                                                                                                       >
                            <MdEdit/>
                        </button>

                        <button
                        onClick={()=>setConfirmationModal({
                            text1: "Delete this Section?",
                        text2: "All the lectures in this section will be deleted",
                        btn1text: "Delete",
                        btn2text: "Cancel",
                        btn1handler: () => handleDeleteSection(section._id),
                        btn2handler: () => setConfirmationModal(null),
                        })}>
                            <MdDelete/>
                        </button>

                        <div className='flex items-center gap-2'>
                            <p>|</p>
                            <AiFillCaretDown/>
                        </div>
                    
                    </div>
            </summary>

            <div className='mb-4'>
                {
                section?.subSection?.map((data)=>(
                    <div
                    key={data?._id}
                    onClick={()=>setViewSubSection(data)} className=' p-3'>
                        <div className='flex justify-between border-b border-richblack-100'>
                            <div className='flex items-center gap-2'>
                                <RxDropdownMenu/>
                                <p>{data.title}</p>
                            </div>

                            <div className='flex item-baseline gap-2' onClick={(e)=>e.stopPropagation()}>
                                <button
                                onClick={()=>setEditSubSection({...data,sectionID:section._id})}                                                                                                                                       >
                                    <MdEdit/>
                                </button>

                                <button
                                onClick={()=>setConfirmationModal({
                                text1: "Delete this Sub-Section?",
                                text2: "All the lectures in this sub-section will be deleted",
                                btn1text: "Delete",
                                btn2text: "Cancel",
                                btn1handler: () => handleDeleteSubSection(data._id,section._id),
                                btn2handler: () => setConfirmationModal(null),
                                })}>
                                    <MdDelete/>
                                </button>                    
                            </div>
                        </div>
                        
                    </div>
                ))
                }

                <button
                    onClick={() => setAddSubSection(section._id)}
                    className="mt-1 px-3 flex items-center gap-x-1 text-yellow-50">
                    
                    <FaPlus className="text-lg" />
                    <p>Add Lecture</p>
                </button>
            </div>

            
        </details>
            
        ))
      }

      {
        addSubSection?(
            <SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />
        ):viewSubSection?(
            <SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />
        ):editSubSection?(
            <SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />
        ):(<></>)
      }

      {
        confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
        )
      }
    </div>
  )
}

export default NestedView
