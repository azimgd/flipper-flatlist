import React from 'react';
import {List, Typography} from 'antd';

const ListBackgroundComponent = ({contentLength, windowRatio}) => (
  <div
    style={{
      backgroundColor: 'gray',
      width: 300,
      position: 'absolute',
      top: 0,
      height: contentLength * windowRatio,
    }}
  />
)

const ListScrollComponent = ({offset, visibleLength, windowRatio}) => (
  <div
    style={{
      backgroundColor: 'rgba(255, 255, 0, 0.5)',
      border: '1px solid rgba(255, 255, 0, 1)',
      width: 300,
      position: 'absolute',
      top: offset * windowRatio,
      height: visibleLength * windowRatio,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography>scroll area</Typography>
  </div>
)

const ListVirtualizedComponent = ({offsetStart, offsetEnd, windowRatio}) => (
  <div
    style={{
      backgroundColor: 'rgba(11, 156, 49, 0.5)',
      border: '1px solid rgba(11, 156, 49, 1)',
      width: 300,
      position: 'absolute',
      top: offsetStart * windowRatio,
      height: offsetEnd * windowRatio,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography>virtualized area</Typography>
  </div>
)

const MinimapComponent = ({inspector}) => {
  if (!inspector.scrollMetrics) {
    return null;
  }
  
  const windowRatioZoomed = (window.innerHeight - 34) / (inspector.scrollMetrics.contentLength || 1);

  return (
    <div style={styles.container}>
      <div style={styles.zoomed}>
        <ListBackgroundComponent
          contentLength={inspector.scrollMetrics.contentLength}
          windowRatio={windowRatioZoomed}
        />

        <ListScrollComponent
          offset={inspector.scrollMetrics.offset}
          visibleLength={inspector.scrollMetrics.visibleLength}
          windowRatio={windowRatioZoomed}
        />

        <ListVirtualizedComponent
          offsetStart={inspector.overscanBegin}
          offsetEnd={inspector.overscanEnd}
          windowRatio={windowRatioZoomed}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    zIndex: 1,
    position: 'relative',
  },
  zoomed: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 300,
  },
};

export default MinimapComponent;