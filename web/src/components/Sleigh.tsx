"use client";

export function Sleigh() {
  return (
    <>
      <div className="pointer-events-none absolute left-[-30%] top-[14%] w-[320px] md:w-[420px] lg:w-[520px]">
        <svg
          viewBox="0 0 200 70"
          className="h-full w-full fill-none stroke-none [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.35))] animate-fly-across"
        >
          <defs>
            <linearGradient id="sleighBody" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="rein" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <g stroke="#fef2f2" strokeWidth="1.5" strokeLinecap="round">
            <path
              d="M20 53 C 38 60, 70 64, 110 64 C135 64, 160 60, 180 55"
              stroke="url(#rein)"
              strokeWidth="3"
            />
            <path
              d="M120 55 L110 30 L105 55"
              stroke="#fef2f2"
              strokeWidth="2.5"
            />
            <path d="M135 51 L130 32 L125 52" stroke="#fef2f2" strokeWidth="2.5" />
            <path
              d="M150 46 L146 30 L140 47"
              stroke="#fef2f2"
              strokeWidth="2.5"
            />
            <path d="M165 40 L162 25 L156 42" stroke="#fef2f2" strokeWidth="2.5" />
          </g>
          <g fill="url(#sleighBody)" stroke="#fecaca" strokeWidth="1.8">
            <path d="M28 39 C30 32, 46 28, 74 30 C80 43, 68 56, 40 56 C30 56, 26 45, 28 39Z" />
            <path d="M63 32 C66 26, 82 26, 90 28 C92 42, 82 48, 70 44 C64 42, 61 37, 63 32Z" />
          </g>
          <g stroke="#f97316" strokeWidth="4" strokeLinecap="round">
            <line x1="34" y1="57" x2="26" y2="64" />
            <line x1="64" y1="59" x2="56" y2="66" />
          </g>
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[-32%] top-[28%] w-[260px] md:w-[340px] lg:w-[400px]">
        <svg
          viewBox="0 0 200 70"
          className="h-full w-full fill-none stroke-none scale-x-[-1] [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.28))] animate-fly-return"
        >
          <defs>
            <linearGradient id="sleighBodyAlt" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="reinAlt" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <g stroke="#fee2e2" strokeWidth="1.4" strokeLinecap="round">
            <path
              d="M20 53 C 38 60, 70 64, 110 64 C135 64, 160 60, 180 55"
              stroke="url(#reinAlt)"
              strokeWidth="2.8"
            />
            <path
              d="M118 51 L108 28 L105 54"
              stroke="#fee2e2"
              strokeWidth="2.3"
            />
            <path
              d="M134 47 L126 27 L122 50"
              stroke="#fee2e2"
              strokeWidth="2.3"
            />
            <path
              d="M150 41 L144 26 L138 44"
              stroke="#fee2e2"
              strokeWidth="2.3"
            />
          </g>
          <g fill="url(#sleighBodyAlt)" stroke="#fde68a" strokeWidth="1.6">
            <path d="M28 39 C30 32, 46 28, 74 30 C80 43, 68 56, 40 56 C30 56, 26 45, 28 39Z" />
            <path d="M63 32 C66 26, 82 26, 90 28 C92 42, 82 48, 70 44 C64 42, 61 37, 63 32Z" />
          </g>
          <g stroke="#fb7185" strokeWidth="3.5" strokeLinecap="round">
            <line x1="34" y1="57" x2="26" y2="64" />
            <line x1="64" y1="59" x2="56" y2="66" />
          </g>
        </svg>
      </div>
    </>
  );
}

export default Sleigh;
