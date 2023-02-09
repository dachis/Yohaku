import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ImCross } from "react-icons/im"
import ReactCardFlip from 'react-card-flip'

interface MenuProps {
    open: boolean
    close: () => void
}

const Menu = ({
    open = false,
    close
}: MenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [isFlipped, setIsFlipped] = useState(false)

    const positionInRect = (x: number, y: number, top: number, left: number, width: number, height: number) => {
        return (left < x && x < left + width) && (top < y && y < top + height)
    }

    const clickOutsideMenu = (event: MouseEvent) => {
        // setIsFlipped(!isFlipped)
        if (!menuRef.current) return
        const x = event.clientX
        const y = event.clientY
        const top = menuRef.current.getBoundingClientRect().top
        const left = menuRef.current.getBoundingClientRect(). left
        const width = menuRef.current.getBoundingClientRect().width
        const height = menuRef.current.getBoundingClientRect().height
        if (!positionInRect(x, y, top, left, width, height)) close()
    }

    useEffect(() => {
        window.addEventListener("click", clickOutsideMenu)
        return () => window.removeEventListener("click", clickOutsideMenu)
    }, [close])

    return (
        <div className='fixed right-1.5 top-1'>
            {
                open &&
                <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={0.3} flipSpeedFrontToBack={0.3} flipDirection="horizontal">
                    <div ref={menuRef} className='flex flex-col items-center bg-gray-100 w-32 h-96 pt-1 text-gray-700 shadow-xl'>
                        <div className='w-full flex justify-end pr-1'>
                            <ImCross className='cursor-pointer' onClick={() => close()} size={14} color={"#ffb0b0"} />
                        </div>
                        <Link href="/" className='text-xl mt-2 text-gray-500'>Home</Link>
                        <Link href="/about" className='text-xl text-gray-500'>About</Link>
                        <Link href="/concept" className='text-xl text-gray-500'>Concept</Link>
                        <div onClick={() => setIsFlipped(!isFlipped)}>〇</div>
                    </div>
                    <div className='flex flex-col items-center bg-gray-100 w-32 h-96 pt-1 text-gray-700 shadow-xl'>
                        裏
                        <div onClick={() => setIsFlipped(!isFlipped)}>〇</div>
                    </div>
                </ReactCardFlip>
            }
        </div>
    )
}

export default Menu