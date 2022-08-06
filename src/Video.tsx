import {Composition, getInputProps} from 'remotion';
import Effects from './Effects';
import Images from './Images';

export const RemotionVideo: React.FC = () => {
  const { 
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

			<Composition
				id="Effects"
				component={Effects}
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
