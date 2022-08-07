import { Img, useCurrentFrame, staticFile, useVideoConfig, getInputProps } from "remotion";

const Lighten = () => {
  const { 
    path,
    prefix,
    start,
    ext,
    stackLength
  } = getInputProps();
  const { 
    width, 
    height 
  } = useVideoConfig();
  const frame = useCurrentFrame();
  const stack = [];
  const firstI = Math.max(0, frame - stackLength);
  for (let i = firstI; i <= frame; i++) {
    const file = `${path}/${prefix}${start + i}.${ext}`;
    const percent = (i - firstI) / Math.min(stackLength, frame);
    stack.push(
      <Img 
        key={i}
        src={staticFile(file)}
        style={{
          position: 'fixed',
          width,
          height,
          objectFit: 'contain',
          mixBlendMode: 'lighten',
          opacity: frame === 0 ? 1 : percent
        }}
      />
    )
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

export default Lighten;