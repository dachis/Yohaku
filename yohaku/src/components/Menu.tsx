import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ImCross, ImLoop2 } from "react-icons/im"
import ReactCardFlip from 'react-card-flip'

interface MenuProps {
    open: boolean
    close: () => void
    flip: () => void
    getIsFlip: () => boolean
}

const Menu = ({
    open = false,
    close,
    flip,
    getIsFlip
}: MenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null)

    const positionInRect = (x: number, y: number, top: number, left: number, width: number, height: number) => {
        return (left < x && x < left + width) && (top < y && y < top + height)
    }

    const clickOutsideMenu = (event: MouseEvent) => {
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
                <ReactCardFlip isFlipped={getIsFlip()} flipSpeedBackToFront={0.3} flipSpeedFrontToBack={0.3} flipDirection="horizontal">
                    <div ref={menuRef} className='flex flex-col items-center bg-gray-100 w-32 h-96 pt-1 text-gray-700 shadow-xl font-titillium'>
                        <ImCross className='absolute top-3 right-1 cursor-pointer hover:fill-[#ffb0b0] hover:scale-110' onClick={() => close()} size={14} />
                        <Link href="/" className='text-xl mt-6 text-gray-500'>Home</Link>
                        <Link href="/about" className='text-xl text-gray-500'>About</Link>
                        <Link href="/concept" className='text-xl text-gray-500'>Concept</Link>
                        <ImLoop2 className='absolute bottom-3 right-1 cursor-pointer hover:opacity-40 hover:scale-110' onClick={() => flip()} size={14} />
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-100 w-32 h-96 pt-1 text-gray-700 shadow-xl'>
                        <ImLoop2 className='absolute bottom-3 right-1 cursor-pointer hover:opacity-40 hover:scale-110' onClick={() => flip()} size={14} />
                        {
                            getIsFlip() && (
                                <div className='rotate-90'>読書</div>
                            )
                        }
                        <ImCross className='absolute top-3 right-1 cursor-pointer hover:fill-[#ffb0b0] hover:scale-110' onClick={() => close()} size={14} />
                    </div>
                </ReactCardFlip>
            }
        </div>
    )
}

export default Menu