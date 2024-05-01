import { useEffect, useRef, useState } from "react";

interface AutoSizeTextarea
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const AutoSizeTextarea = (props: AutoSizeTextarea) => {
  const { ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number | string>("auto");
  const [initHeight, setInitHeight] = useState<number | null>(null);
  const [val, setVal] = useState<any>("");

  useEffect(() => {
    setVal(rest.value)
  }, [rest.value]);

  useEffect(()=>{
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const borderHeight = textareaRef.current.offsetHeight - textareaRef.current.clientHeight;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + borderHeight}px`;
    }
  }, [rest.value])

  return (
    <textarea
      ref={textareaRef}
      style={{ height }}
      rows={1}
      {...rest}
    />
  );
};

export default AutoSizeTextarea;
