import {Composition, getInputProps} from 'remotion';
import Images from './Images';

export const RemotionVideo: React.FC = () => {
  let { 
    fps,
		width,
		height,
		durationInFrames
  } = getInputProps();
	return (
		<>
			<Composition
				id="Images"
				component={Images}
				{...{
					fps,
					width,
					height,
					durationInFrames
				}}
			/>
		</>
	);
};
