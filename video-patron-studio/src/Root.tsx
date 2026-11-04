import React from 'react';
import { Composition } from 'remotion';
import { PatronVideo, VideoProps } from './Video';
import { DURATION, FPS, H, W } from './timeline';

export const Root: React.FC = () => (
  <>
    <Composition
      id="PatronStudio"
      component={PatronVideo}
      durationInFrames={DURATION}
      fps={FPS}
      width={W}
      height={H}
      defaultProps={{ showContact: true, debugSafe: false } satisfies VideoProps}
    />
    <Composition
      id="PatronStudioSansContact"
      component={PatronVideo}
      durationInFrames={DURATION}
      fps={FPS}
      width={W}
      height={H}
      defaultProps={{ showContact: false, debugSafe: false } satisfies VideoProps}
    />
  </>
);
