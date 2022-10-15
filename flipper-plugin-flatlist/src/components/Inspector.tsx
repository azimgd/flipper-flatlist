import React from 'react';
import {Table} from 'antd';

const MinimapComponent = ({items, inspector}) => {
  if (!items.items || !inspector.scrollMetrics) {
    return null;
  }

  const dataSource = [{
    key: '1',
    source: 'rendered range',
    value: `${items.output.first} - ${items.output.last}`,
  }, {
    key: '1',
    source: 'screen size',
    value: `${inspector.scrollMetrics.visibleLength}px`,
  }, {
    key: '1',
    source: 'overscan range',
    value: `${inspector.overscanBegin}px - ${inspector.overscanEnd}px`,
  }, {
    key: '1',
    source: 'total size',
    value: `${inspector.scrollMetrics.contentLength}px`,
  }, {
    key: '1',
    source: 'total count',
    value: `${inspector.itemCount}`,
  }, {
    key: '1',
    source: 'velocity',
    value: `${inspector.scrollMetrics.velocity.toFixed(2)}`,
  }, {
    key: '1',
    source: 'doffset',
    value: `${inspector.scrollMetrics.dOffset} ${inspector.scrollMetrics.dt}`,
  }, ];
  
  const columns = [
    {
      title: 'source',
      dataIndex: 'source',
      key: 'source',
      width: 160,
    },
    {
      title: 'value',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  

  return (
    <div style={styles.container}>
      <Table dataSource={dataSource} columns={columns} pagination={{hideOnSinglePage: true}} />
    </div>
  );
};

const styles = {
  container: {
    padding: 12,
  },
};

export default MinimapComponent;