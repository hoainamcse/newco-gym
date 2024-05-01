import { useEffect, useRef, useState } from "react";

interface AutoSizeTextarea
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const AutoSizeTextarea = (props: AutoSizeTextarea) => {
  const { ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const borderHeight =
        textareaRef.current.offsetHeight - textareaRef.current.clientHeight;
      if (rest.value) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight + borderHeight}px`;
      } else {
        textareaRef.current.style.height = "auto";
      }
    }
  }, [rest.value, isFocus]);

  return <textarea ref={textareaRef} rows={1} {...rest} />;
};

export default AutoSizeTextarea;
