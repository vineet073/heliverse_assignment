
import React, { useEffect, useState } from 'react'
import { formUrlQuery, removeUrlQuery } from '../../services/utils';
import { HomePageFilters } from '../../constants/filterData';

const HomeFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const filter = searchParams.get('filter');
    const [active, setActive] = useState(filter || '');
  
    useEffect(() => {
      if (filter) {
        setActive(filter);
      }
    }, [filter]);

  const handleClick=(item)=>{
    if(item===active){
      setActive('');
      const newUrl=removeUrlQuery({
        params:searchParams.toString(),
        keys:['filter']
      });
      window.history.pushState(newUrl,{scroll:false});
    }else{
      setActive(item);
      const newUrl=formUrlQuery({
        params:searchParams.toString(),
        key:'filter',
        value:item.toLowerCase()
      });
      window.history.pushState(newUrl,{scroll:false});
    }
  }
      

  return (
    <div className='flex gap-4 max-md:hidden'>
      {
        HomePageFilters.map((item)=>(
            <button
            key={item.value}
            onClick={()=>{}}
            className={`${active=== item.value? "bg-primary-100 text-primary-500":
            "bg-light-800 text-light-500"}`}
            onClickCapture={()=>handleClick(item.value)}>
                {item.name}
            </button>
        ))
      }
    </div>
  )
}

export default HomeFilters
