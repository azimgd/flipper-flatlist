import React from 'react';
import {Table} from 'antd';

const MinimapComponent = ({items, inspector}) => {
  if (!items.items || !inspector.scrollMetrics) {
    return null;
  }

  const dataSource = [{
    key: 'rendered-range',
    source: 'rendered range',
    value: `${items.output.first} - ${items.output.last}`,
  }, {
    key: 'screen-length',
    source: 'screen length',
    value: `${inspector.scrollMetrics.visibleLength}px`,
  }, {
    key: 'content-length',
    source: 'content length',
    value: `${inspector.scrollMetrics.contentLength}px`,
  }, {
    key: 'tail-spacer',
    source: 'tail spacer length',
    value: `${inspector.tailSpacerLength}px`,
  }, {
    key: 'overscan-range',
    source: 'overscan range',
    value: `${inspector.overscanBegin}px - ${inspector.overscanEnd}px`,
  }, {
    key: 'total-count',
    source: 'total count',
    value: `${inspector.itemCount}`,
  }, {
    key: 'velocity',
    source: 'velocity',
    value: `${inspector.scrollMetrics.velocity.toFixed(2)}`,
  }, {
    key: 'doffset',
    source: 'doffset',
    value: `${inspector.scrollMetrics.dOffset} ${inspector.scrollMetrics.dt}`,
  }];
  
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