import { useState } from "react";
import Tab from "../Tab";
import Upload from "../Upload";
import UserList from "../UserList";

const tabData = [
  {
    id: 1,
    tabName: "Enrolled Students",
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
        field === "Enrolled Students" ? (
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
