import { useState } from "react";
import Tab from "../components/Core/Tab";
import ApprovedInstructors from "../components/Core/ApprovedInstructors";
import ApprovalRequests from "../components/Core/ApprovalRequests";

const tabData = [
  {
    id: 1,
    tabName: "Instructors",
  },
  {
    id: 2,
    tabName: "Approvals",
  }
]

function AllInstructors() {
  const [field, setField] = useState(tabData[0].tabName);

  return (
    <div>
      <Tab tabData={tabData} field={field} setField={setField} />
      {
        field === "Instructors" ? (
          <ApprovedInstructors setField={setField} tabData={tabData}/>
        ) : (
          <ApprovalRequests/>
        )
      }
    </div>
  );
}

export default AllInstructors
