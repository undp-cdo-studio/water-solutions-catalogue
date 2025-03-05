"use client"
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
export default function Banner() {
  const [open, setOpen] = useState(true)
  return (
    <div onClick={() => setOpen(false)} className={`${!open && "hidden"} hover:cusor-pointer flex items-center gap-x-6 bg-undp-blue px-6 pt-6 pb-2.5 sm:px-3.5 sm:before:flex-1`}>
      <p className="text-sm/6 text-white">
        <a href="#">
          <strong className="font-semibold">Beta version </strong>
          {/* <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg> */}
          - Now under pilot testing
        </a>
      </p>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  )
}
