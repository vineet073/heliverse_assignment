import React, { useEffect, useState } from 'react'
import { formUrlQuery } from '../../services/utils';

const Pagination = ({pageNumber,isNext}) => {
    const searchParams = new URLSearchParams(window.location.search);
    const [currentPage, setCurrentPage] = useState(pageNumber);
  
    useEffect(() => {
      const page = searchParams.get('page');
      if (page) {
        setCurrentPage(Number(page));
      } else {
        setCurrentPage(pageNumber);
      }
    }, [pageNumber, searchParams]);

    const handleNavigation=(direction)=>{
        const nextPage=direction==='prev'?currentPage-1 : currentPage+1;
        const newUrl=formUrlQuery({
            params:searchParams.toString(),
            key:'page',
            value:nextPage.toString()
        })

        window.history.pushState(newUrl,'',newUrl);
        setCurrentPage(nextPage);
    }
  return (
    <div className='flex items-center justify-center gap-2'>
        <button disabled={pageNumber===1}
        onClick={()=>handleNavigation('prev')}
        className='background-light800_dark300 btn light-border-2 px-3'>
            <p className='text-dark200_light800'>Prev</p>
        </button>

        <div className='bg-primary-500 px-3.5 py-3 rounded-md w-fit text-white font-semibold'>{pageNumber}</div>

        <button disabled={!isNext}
        onClick={()=>handleNavigation('next')}
        className='background-light800_dark300 btn light-border-2 px-3'>
            <p className='text-dark200_light800'>Next</p>
        </button>

    </div>
  )
}

export default Pagination