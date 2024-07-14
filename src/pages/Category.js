import React, { useState } from 'react';
import Tab from '../components/Core/Tab';
import ViewCategoryList from '../components/Core/ViewCategoryList';
import AddCategory from '../components/Core/AddCategory';

const tabData = [
  {
    id: 1,
    tabName: "View Category",
  },
  {
    id: 2,
    tabName: "Add Category",
  }
]

function Category() {
  const [field, setField] = useState(tabData[0].tabName);

  return (
    <div>
      <Tab tabData={tabData} field={field} setField={setField} />
      {
        field === "View Category" ? (
          <ViewCategoryList setField={setField} tabData={tabData}/>
        ) : (
          <AddCategory/>
        )
      }
    </div>
  );
}

export default Category;
