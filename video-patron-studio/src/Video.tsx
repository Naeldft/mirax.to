import { ThreeCanvas } from '@remotion/three';
import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { AssetGate } from './assets';
import { config } from './config';
import { Overlay } from './overlay/Overlay';
import { World } from './three/World';
import { Sound } from './Sound';

/** layer : 'all' (normal), '3d' ou 'text' — calques séparés pour le contrôle automatique de mise en page. */
export type VideoProps = { showContact: boolean; debugSafe?: boolean; layer?: 'all' | '3d' | 'text' };

export const PatronVideo: React.FC<VideoProps> = ({ showContact, debugSafe, layer = 'all' }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: config.marque.fond }}>
      <AssetGate>
        {layer !== 'text' && (
          <ThreeCanvas width={width} height={height} camera={{ fov: 40, position: [0, 0, 13], near: 0.05, far: 300 }} gl={{ antialias: true }}>
            <World decor={layer === 'all'} />
          </ThreeCanvas>
        )}
        {layer !== '3d' && <Overlay showContact={showContact} debugSafe={debugSafe} />}
      </AssetGate>
      {layer === 'all' && <Sound showContact={showContact} />}
    </AbsoluteFill>
  );
};
