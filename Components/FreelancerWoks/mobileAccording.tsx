import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type MobileAccordingProps = {
    title: string,
    path: string

}

const MobileAccording = ({ title, path }: MobileAccordingProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()



    const handleNavigation = () => {
        router.push(path);
    };
    return (
        <div className="border-b">
            <button
                className="accordion-header flex justify-between items-center w-full p-4 text-left"
                onClick={handleNavigation}
            >
                <span className='font-medium font-sans text-gray-700'>{title}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

        </div>
    )
}

export default MobileAccording
