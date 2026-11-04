import { ThreeCanvas } from '@remotion/three';
import React from 'react';
import { AbsoluteFill, Audio, getStaticFiles, interpolate, staticFile, useVideoConfig } from 'remotion';
import { AssetGate } from './assets';
import { config } from './config';
import { Overlay } from './overlay/Overlay';
import { World } from './three/World';
import { FPS } from './timeline';

export type VideoProps = { showContact: boolean; debugSafe?: boolean };

const MUSIC = 'audio/musique.mp3';

/** Musique facultative : ajoutée seulement si public/audio/musique.mp3 existe. */
const Music: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const exists = getStaticFiles().some((f) => f.name === MUSIC);
  if (!exists) return null;
  const { volume, fonduEntreeSec, fonduSortieSec } = config.son;
  return (
    <Audio
      src={staticFile(MUSIC)}
      volume={(f) =>
        interpolate(
          f,
          [0, fonduEntreeSec * FPS, durationInFrames - fonduSortieSec * FPS, durationInFrames],
          [0, volume, volume, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        )
      }
    />
  );
};

export const PatronVideo: React.FC<VideoProps> = ({ showContact, debugSafe }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: config.marque.fond }}>
      <AssetGate>
        <ThreeCanvas width={width} height={height} camera={{ fov: 40, position: [0, 0, 13], near: 0.05, far: 300 }} gl={{ antialias: true }}>
          <World />
        </ThreeCanvas>
        <Overlay showContact={showContact} debugSafe={debugSafe} />
      </AssetGate>
      <Music />
    </AbsoluteFill>
  );
};
