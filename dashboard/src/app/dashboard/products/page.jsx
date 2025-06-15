import React from 'react'
import  Image  from 'next/image';

export default function page() {
  return (
    <section className=' w-full h-full'>
      <div className="container grid grid-cols-3 gap-4 p-5">
        <div className="product-card bg-black rounded-lg">
            <div className="card-header bg-gray-500">
                <Image
                src={"/../../../public/next.svg"}
                alt="produrct-image"
                width={100}
                height={100}
                />
            </div>
        </div>
      </div>
    </section>
  )
}
