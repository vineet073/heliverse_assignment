import { useState } from "react";
import Tab from "../components/Core/Tab";
import UserList from "../components/Core/UserList";
import AddUsers from "../components/Core/AddUsers";

const tabData = [
  {
    id: 1,
    tabName: "Instructors",
  },
  {
    id: 2,
    tabName: "Add Instructor",
  }
]

function AllInstructors() {
  const [field, setField] = useState(tabData[0].tabName);

  return (
    <div>
      <Tab tabData={tabData} field={field} setField={setField} />
      {
        field === "Instructors" ? (
          <UserList setField={setField} tabData={tabData}/>
        ) : (
          <AddUsers/>
        )
      }
    </div>
  );
}

export default AllInstructors
