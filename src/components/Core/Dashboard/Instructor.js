import { useState } from "react";
import Tab from "../Tab";
import Upload from "../Upload";
import { useForm } from "react-hook-form";
import UserList from "../UserList";

const tabData = [
  {
    id: 1,
    tabName: "Students Enrolled",
  },
  {
    id: 2,
    tabName: "Timetable",
  }
]

function Instructor() {
  const [field, setField] = useState(tabData[0].tabName);


  return (
    <div>
      <Tab tabData={tabData} field={field} setField={setField} />
      {
        field === "Students Enrolled" ? (
          <UserList setField={setField} tabData={tabData}/>
        ) : (
          <Upload
          />
        )
      }
    </div>
  );
}

export default Instructor
