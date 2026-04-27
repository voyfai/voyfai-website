import useInView from "../hooks/useInView";

export default function Reveal({ children, delay = 0, as: Tag = "div", style = {}, className = "", ...rest }) {
  const [ref, inView, observed] = useInView();

  return (
    <Tag
      ref={ref}
      data-in={inView ? "true" : "false"}
      data-observed={observed ? "true" : "false"}
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
