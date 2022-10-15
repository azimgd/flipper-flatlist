import React from 'react';
import {PluginClient, usePlugin, createState, useValue, Layout, DetailSidebar} from 'flipper-plugin';
import List from './components/List';
import Minimap from './components/Minimap';
import Inspector from './components/Inspector';

type Inspector = {
  overscanBegin: any;
  overscanEnd: any;
  visibleBegin: any;
  visibleEnd: any;
  itemCount: any;
  scrollMetrics: any;
}

type Items = {
  output: any;
  items: any;
  layouts: any;
};

type Events = {
  inspector: Inspector;
  items: Items;
};

export function plugin(client: PluginClient<Events, {}>) {
  const inspector = createState<Record<string, Inspector>>({}, {});
  const items = createState<Record<string, Items>>({}, {});

  client.onMessage('inspector', (payload) => {
    inspector.update(() => payload);
  });
  client.onMessage('items', (payload) => {
    items.update(() => payload);
  });

  return {inspector, items};
}

export function Component() {
  const instance = usePlugin(plugin);
  const inspector = useValue(instance.inspector);
  const items = useValue(instance.items);

  return (
    <>
      <Layout.ScrollContainer>
        <Inspector items={items} inspector={inspector} />
      </Layout.ScrollContainer>

      <DetailSidebar>
        <Layout.ScrollContainer>
          <List items={items} inspector={inspector} />
        </Layout.ScrollContainer>
      </DetailSidebar>

      <DetailSidebar>
        <Minimap inspector={inspector} />
      </DetailSidebar>
    </>
  );
}
