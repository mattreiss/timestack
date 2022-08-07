import { Img, useCurrentFrame, staticFile, useVideoConfig, getInputProps } from "remotion";

const Slice = () => {
  const { 
    path,
    prefix,
    start,
    ext,
    stackLength,
  } = getInputProps();
  const {
    width, 
    height 
  } = useVideoConfig();
  const frame = useCurrentFrame();
  const stack = [];
  const firstI = Math.max(0, frame - stackLength);
  let left = 0;
  for (let i = firstI; i <= frame; i++) {
    const file = `${path}/${prefix}${start + i}.${ext}`;
    const size = Math.min(stackLength, frame);
    const sliceWidth = Math.round(width / size);
    const right = left + sliceWidth;
    stack.push(
      <Img 
        key={i}
        src={staticFile(file)}
        style={{
          position: 'fixed',
          width,
          height,
          objectFit: 'contain',
          clipPath: `inset(0px ${width - right - right}px 0px ${left}px)`
        }}
      />
    );
    left = right;
  }
  return (
    <div style={{ 
      backgroundColor: "black",
      display: 'flex',
      flex: 1,
    }}>
      {stack}
    </div>
  );
}

export default Slice;