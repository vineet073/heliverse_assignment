import toast from "react-hot-toast";
import ApiConnector from '../ApiConnector';
import { catalogData, courseEndpoints } from "../Api";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
  } = courseEndpoints;


export async function getAllCourses(){
    const toastID=toast.loading("Loading...");
    let result=[];
    try {
        const response=await ApiConnector("GET",GET_ALL_COURSE_API);
        if(!response.data.success){
            throw new Error("Error in getting all courses");
        }

        result=response?.data?.data;
    } catch (error) {
        console.log("GET ALL COURSES ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export async function fetchCourseDetails(courseID){
    const toastID=toast.loading("Loading...");
    let result=null;
    try {
        const response=await ApiConnector("POST",COURSE_DETAILS_API
        ,{courseID});

        if(!response.data.success){
            throw new Error("Error in getting all course details");
        }

        result=response?.data?.courseDetails;
    } catch (error) {
        console.log("GET ALL COURSE DETAILS ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export async function fetchFullCourseDetails(courseID,token){
  const toastID=toast.loading("Loading...");
  let result=null;
  try {
      const response=await ApiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED
      ,{courseID},
      {
        "Authorization":`Bearer ${token}`
      });

      if(!response.data.success){
          throw new Error("Error in getting all course details");
      }

      result=response?.data;
  } catch (error) {
      console.log("GET ALL COURSE DETAILS ERROR->",error);
      console.log(error.message);
      toast.error(error.message);
  }
  toast.dismiss(toastID);
  return result;
}
  
export async function fetchCourseCategory(){
    const toastID=toast.loading("Loading...");
    let result=[];
    try {
        const response=await ApiConnector("GET",COURSE_CATEGORIES_API);
        if(!response.data.success){
            throw new Error("Error in getting course categories");
        }

        // toast.success("Course updated successfully");
        result=response?.data?.allCategorys;
    } catch (error) {
        console.log("COURSE CATEGORY ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export async function fetchCatalogPageData(categoryID){
 const toastID=toast.loading('Loading...');
 let result=[];
 try {
    const response=await ApiConnector("POST",catalogData.CATALOGPAGEDATA_API,
    {categoryID:categoryID});

    if(!response?.data?.success){
      throw new Error("Could not fetch catalog data for the given categoryID");
    }
    result=response?.data?.data;
 } catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastID);
  return result;
}

export async function addCourseDetails(data,token){
    const toastID=toast.loading("Loading...");
    let result=null;
    try {
        const response=await ApiConnector("POST",CREATE_COURSE_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error in creating course");
        }
        toast.success("Course created successfully");
        result=response?.data?.data;
    } catch (error) {
        console.log("CREATE COURSE ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export async function editCourseDetails(data,token){
    const toastID=toast.loading("Loading...");
    let result=null;
    try {
        const response=await ApiConnector("POST",EDIT_COURSE_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error("Error in updating course");
        }

        toast.success("Course updated successfully");
        result=response?.data?.updatedCourse;
    } catch (error) {
        console.log("COURSE UPDATION ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export async function createSection(data,token){
    const toastID=toast.loading("Loading...");
    let result=null;
    try {
        const response=await ApiConnector("POST",CREATE_SECTION_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error("Error in creating section");
        }

        toast.success("Section created successfully");
        result=response?.data?.updatedCourse;
        console.log(result);
    } catch (error) {
        console.log("SECTION CREATION ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export async function createSubSection(data,token){
    const toastID=toast.loading("Loading...");
    let result=null;
    try {
        const response=await ApiConnector("POST",CREATE_SUBSECTION_API,data,{
            "Content-Type":"multipart/ form-data",
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error("Error in creating sub-section");
        }

        toast.success("Sub-Section created successfully");
        result=response?.data?.updatedSection;
    } catch (error) {
        console.log("Sub-SECTION CREATION ERROR->",error);
        console.log(error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("POST", UPDATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.updatedCourse;
      
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
    
}

export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.updatedSection
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.updatedCourse;
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.updatedSection
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector(
        "GET",
        GET_ALL_INSTRUCTOR_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.instructorCourses;
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    
}

export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
}

export const createRating = async (data, token) => {
const toastId = toast.loading("Loading...")
let success = false
try {
    const response = await ApiConnector("POST", CREATE_RATING_API, data, {
    Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
    throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
} catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
}
toast.dismiss(toastId)
return success
}



