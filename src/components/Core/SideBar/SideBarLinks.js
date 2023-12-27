import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

export default function SideBarLinks ({name,iconName,path}) {
    const Icon=Icons[iconName];
    const location = useLocation()
    const dispatch = useDispatch()
  
    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname)
    }

  return (
    <div
    className={`relative pl-7 mb-2 py-[7px] text-sm font-medium ${matchRoute(path)?
         "bg-yellow-800 text-yellow-50 border-l-2 font-medium border-yellow-50"
          : "bg-opacity-0 text-richblack-300 border-l-2 font-medium border-richblack-800"
        } transition-all duration-200`}>

        <NavLink to={path} className="flex gap-2 items-center">    
            <Icon className='text-base'/>
            <div className='text-base'>{name}</div>
        </NavLink>
    </div>
  )
}

