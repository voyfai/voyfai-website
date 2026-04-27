import fs from 'fs';

let svgContent = fs.readFileSync('src/assets/Voyfai-map.svg', 'utf-8');

let jsx = svgContent
  .replace(/xmlns:xlink/g, 'xmlnsXlink')
  .replace(/fill-rule/g, 'fillRule')
  .replace(/clip-rule/g, 'clipRule')
  .replace(/stroke-width/g, 'strokeWidth')
  .replace(/stroke-linecap/g, 'strokeLinecap')
  .replace(/stroke-linejoin/g, 'strokeLinejoin')
  .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
  .replace(/stroke-dasharray/g, 'strokeDasharray')
  .replace(/stroke-dashoffset/g, 'strokeDashoffset')
  .replace(/stop-color/g, 'stopColor')
  .replace(/stop-opacity/g, 'stopOpacity')
  .replace(/class=/g, 'className=')
  .replace(/<!--[\s\S]*?-->/g, '');

let index = 0;
jsx = jsx.replace(/<path([^>]*?)fill="([^"]+)"([^>]*?)>/gi, (match, before, fill, after) => {
  const isSelfClosing = after.trim().endsWith('/');
  const cleanAfter = isSelfClosing ? after.replace(/\/$/, '') : after;

  if (fill.toUpperCase() === '#00AA96' || fill.toUpperCase() === '#03A696') {
    index++;
    return `<path${before}${cleanAfter} style={{ fill: inView ? "var(--voyfai-teal)" : "#e6e6e6", transition: "fill 900ms var(--ease-out-expo)", transitionDelay: \`\${${index} * 60}ms\` }} ${isSelfClosing ? '/' : ''}>`;
  }
  return `<path${before}${cleanAfter} fill="rgba(0,0,0,0.04)" ${isSelfClosing ? '/' : ''}>`;
});

const componentCode = `import { COLORS } from "../constants/colors";
import useInView from "../hooks/useInView";

const offices = [
  { x: 18, y: 55, delay: 0 },
  { x: 38, y: 60, delay: 420 },
  { x: 41, y: 64, delay: 840 },
  { x: 47, y: 60, delay: 1200 },
  { x: 50, y: 64, delay: 1660 },
];

export default function NorthernEuropeMap() {
  const [ref, inView] = useInView({ threshold: 0.2, once: true });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <div style={{ width: "100%", height: "auto", display: "block" }}>
        ${jsx.replace(/<svg /, '<svg style={{ width: "100%", height: "auto", display: "block" }} ')}
      </div>

      {offices.map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: \`\${o.x}%\`,
            top: \`\${o.y}%\`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            opacity: window.matchMedia("(prefers-reduced-motion: reduce)").matches || inView ? 1 : 0,
            transition: \`opacity 600ms ease \${o.delay}ms\`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              background: COLORS.copper,
              opacity: 0.15,
              animation: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "none" : \`gentlePulse 2.8s ease infinite \${o.delay}ms\`,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.copper,
              border: \`2px solid \${COLORS.warmWhite}\`,
              boxShadow: "0 0 8px rgba(3,166,150,0.35)",
              position: "relative",
            }}
          />
        </div>
      ))}
    </div>
  );
}
`;

fs.writeFileSync('src/components/NorthernEuropeMap.jsx', componentCode);
console.log('Successfully converted SVG to NorthernEuropeMap.jsx');
