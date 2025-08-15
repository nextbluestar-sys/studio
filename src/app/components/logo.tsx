import { SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g>
        <path fill="url(#shieldGradient)" d="M100 10 L20 40 L20 110 C20 150 100 190 100 190 C100 190 180 150 180 110 L180 40 Z" />
        <path fill="hsl(var(--primary-foreground))" d="M100 20 L30 50 L30 110 C30 145 100 180 100 180 C100 180 170 145 170 110 L170 50 Z" opacity="0.1" />
        <circle cx="100" cy="100" r="50" fill="url(#shieldGradient)" />
        <circle cx="100" cy="100" r="40" fill="hsl(var(--sidebar-background))" />
        <circle cx="100" cy="100" r="25" fill="url(#shieldGradient)" />
        <circle cx="100" cy="100" r="10" fill="white" />
        <path
          d="M 50,70 A 80 80 0 0 1 150 70"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
        />
         <path
          d="M 50,130 A 80 80 0 0 0 150 130"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
        />
      </g>
    </svg>
  );
}
