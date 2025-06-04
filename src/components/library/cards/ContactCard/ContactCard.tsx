import { LucideImages, PlusIcon, UsersIcon } from 'lucide-react';
import React, { useState } from 'react';
import studentAvatar from '../../../../assets/images/ContactCard/student_studio.jpeg';

export interface ContactCardProps {
  name?: string;
  role?: string;
  followers?: string;
  posts?: string;
  avatar?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  name = 'John Doe',
  role = 'Software Engineer with a long title that might wrap',
  followers = '1.2K',
  posts = '150',
  avatar,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const avatarSrc = avatar || studentAvatar;
  return (
    <div
      className="relative bg-white h-[30rem] w-[20rem] rounded-3xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* AVATAR BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          src={avatarSrc}
          alt={name}
          className={`rounded-3xl object-cover border border-gray-200 mb-2 transform shadow-lg transition-all duration-300 w-full ${
            isHovering ? 'h-full' : 'h-3/4'
          }`}
          style={{ height: isHovering ? '100%' : '60%' }}
        />
      </div>
      {/* INFO */}
      <div className="absolute bottom-5 left-8 z-2">
        <div className="font-bold text-lg text-gray-900">
          <h4 className="text-[25px]">{name}</h4>
        </div>
        <div className="text-gray-600 text-sm h-[3rem] max-w-[13rem] break-words overflow-hidden">
          {role}
        </div>
        <div className="flex items-center w-[17rem] justify-between mt-8 overflow-hidden">
          <div className="text-gray-500 text-sm w-[70%]">
            <span className="font-semibold">
              <UsersIcon className="inline-block h-4 w-4 mr-1" />
              <b className="text-black font-medium">{followers}</b>
            </span>
            <span className="ml-4 font-semibold">
              <LucideImages className="inline-block h-4 w-4 mr-1" />
              <b className="text-black font-medium">{posts}</b>
            </span>
          </div>
          <div className="flex items-center justify-end">
            <button className="bg-gray-200 text-neutral-900 px-8 py-2 rounded-4xl  transition-colors flex items-center hover:bg-gray-300 cursor-pointer">
              <span className="text-sm font-semibold">Follow</span>
              <PlusIcon className="inline-block ml-1 h-4 w-4 m-0" />
            </button>
          </div>
        </div>
      </div>
      {/* LINEAR BACKGROUND */}
      <div
        className="absolute h-50 bottom-0 w-full pointer-events-none transition-opacity duration-300 z-1"
        style={{
          background:
            'linear-gradient(to top, rgba(255,255,255,1) 0% ,rgba(255,255,255,1) 25%, rgba(255,255,255,0) 100%)',
          opacity: isHovering ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ContactCard;
