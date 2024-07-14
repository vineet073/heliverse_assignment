import React from 'react';
import { NavLink } from 'react-router-dom';

const Metric = ({imgUrl,value,title,href,isAuthor,textStyles,alt}) => {
    const renderMetric = (
          <div className='flex items-center gap-1'>
            <img
              src={imgUrl}
              alt={alt}
              width={16}
              height={16}
              className='rounded-full'
            />
            <p className={`${textStyles} flex gap-1`}>
                {value}
                <span className={`${isAuthor?"max-sm:hidden":""} line-clamp-1`}>
                    {title}
                </span>
            </p>
          </div>
        );

    if(href){        
        <NavLink to={href}>
            {renderMetric}
        </NavLink>
    } 

    return <div>
        {renderMetric}
    </div>

}

export default Metric
