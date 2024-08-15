import React, { useState } from 'react';
import Tab from '../components/Core/Tab';
import AddClassroom from '../components/Core/AddClassroom';
import ClassroomList from '../components/Core/ClassroomList';

const tabData = [
  {
    id: 1,
    tabName: "All Classroom",
  },
  {
    id: 2,
    tabName: "Add Classroom",
  }
]

function Classroom() {
  const [field, setField] = useState(tabData[0].tabName);

  return (
    <div>
      <Tab tabData={tabData} field={field} setField={setField} />
      {
        field === "All Classroom" ? (
          <ClassroomList setField={setField} tabData={tabData}/>
        ) : (
          <AddClassroom/>
        )
      }
    </div>
  );
}

export default Classroom;
