

const BgAnimation = ()=> (
  <>
    <div className="fixed pointer-events-none z-[-1] opacity-[.3] bg-anim-wrapper h-full overflow-hidden w-full">
        <div id="bg-anim" className="bg-animation w-full h-full" >
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
            <radialGradient id="Gradient1" cx="50%" cy="50%" fx="1.841602%" fy="50%" r=".5">
                <animate attributeName="fx" dur="38s" values="0%;45%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="rgb(0 166 87 / 100%)" />
                <stop offset="100%" stopColor="rgb(0 166 87 / 0%)" />
            </radialGradient>

            <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
                <animate attributeName="fx" dur="35.5s" values="0%;3%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="rgb(0 162 220 / 100%)" />
                <stop offset="100%" stopColor="rgb(0 162 220 / 0%)" />
            </radialGradient>

            <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
                <animate attributeName="fx" dur="31.5s" values="0%;3%;0%" repeatCount="indefinite" />
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>


            </defs>

            <rect
            x="13.744%"
            y="1.18473%"
            width="100%"
            height="100%"
            fill="url(#Gradient1)"
            transform="rotate(334.41 50 50)"
            >
            <animate attributeName="x" dur="30s" values="25%;0%;25%" repeatCount="indefinite" />
            <animate attributeName="y" dur="31s" values="0%;25%;0%" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="17s" repeatCount="indefinite" />
            </rect>

            <rect
            x="-2.17916%"
            y="35.4267%"
            width="100%"
            height="100%"
            fill="url(#Gradient2)"
            transform="rotate(255.072 50 50)"
            >
            <animate attributeName="x" dur="33s" values="-25%;0%;-25%" repeatCount="indefinite" />
            <animate attributeName="y" dur="34s" values="0%;50%;0%" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="22s" repeatCount="indefinite" />
            </rect>

            <rect
            x="9.00483%"
            y="14.5733%"
            width="100%"
            height="100%"
            fill="url(#Gradient3)"
            transform="rotate(139.903 50 50)"
            >
            <animate attributeName="x" dur="35s" values="0%;25%;0%" repeatCount="indefinite" />
            <animate attributeName="y" dur="22s" values="0%;25%;0%" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="19s" repeatCount="indefinite" />
            </rect>
        </svg>
        </div>
    </div>

  
  </>
)
export default BgAnimation;