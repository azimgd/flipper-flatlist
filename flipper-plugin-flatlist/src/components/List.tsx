import React from 'react';
import {List, Typography} from 'antd';

function between(x, min, max) {
  return x >= min && x <= max;
}

const MinimapComponent = ({items, inspector}) => {
  if (!items.items || !inspector.scrollMetrics) {
    return null;
  }
  
  const renderItem = (item, index) => {
    const layout = items.layouts[index]
    const isVisible = between(layout.offset, inspector.scrollMetrics.offset, inspector.scrollMetrics.offset + inspector.scrollMetrics.visibleLength)
    const backgroundStyle = {backgroundColor: isVisible ? 'rgba(255, 255, 0, 0.5)' : undefined}

    return (
      <List.Item style={backgroundStyle}>
        <div>
          <div>
            <Typography.Text code>{JSON.stringify(item)}</Typography.Text>
          </div>
          <div>
            <Typography.Text code>{JSON.stringify(layout)}</Typography.Text>
          </div>
        </div>
      </List.Item>
    )
  }

  return (
    <div style={styles.container}>
      <List
        style={{backgroundColor: 'rgba(11, 156, 49, 0.5)'}}
        size="small"
        bordered
        dataSource={items.items}
        renderItem={renderItem}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
  },
};

export default MinimapComponent;