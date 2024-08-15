import { useState } from "react";
import Tab from "../components/Core/Tab";
import UserList from "../components/Core/UserList";
import AddUsers from "../components/Core/AddUsers";

const tabData = [
  {
    id: 1,
    tabName: "Students",
  },
  {
    id: 2,
    tabName: "Add Students",
  }
]

function AllStudents() {
  const [field, setField] = useState(tabData[0].tabName);

  return (
    <div>
      <Tab tabData={tabData} field={field} setField={setField} />
      {
        field === "Students" ? (
          <UserList setField={setField} tabData={tabData}/>
        ) : (
          <AddUsers/>
        )
      }
    </div>
  );
}

export default AllStudents
