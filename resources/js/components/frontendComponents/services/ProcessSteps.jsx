import React from 'react'

const CardsData = [
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Concept Development",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Design",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Presentation for",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Research and Brainstorm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Concept Development",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Design",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
    {
        title: "Presentation for",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, facilis. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, molestias!"
    },
]

const ProcessSteps = () => {
    return (
        <div className='flex gap-5 overflow-x-scroll my-20 py-4 px-4'>
            {CardsData.map((item, index) => (
                <div key={index} className='bg-white/35 p-10 rounded-3xl min-w-[400px]'>
                    <button className='bg-gradient-to-br from-[var(--blue)] to-[var(--green)] py-2 px-6 rounded-3xl text-white mb-5'>
                        {item.title}
                    </button>
                    <p>{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default ProcessSteps
