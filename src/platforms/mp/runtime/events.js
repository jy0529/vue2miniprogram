import { wxDomEventsMapping } from './utils';

function getEvents(vnode, e) {
  const eventTypes = wxDomEventsMapping[e.type];
  const eventId = e.currentTarget.dataset['eventid'];

  let events = [];
  let queue = [vnode];
  while(queue.length > 0) {
    let _vnode = queue.pop();

    if (Array.isArray(_vnode.children) && _vnode.children.length > 0) {
      queue.push(..._vnode.children);
    }
    if (
      _vnode.data &&
      _vnode.data.attrs &&
      _vnode.data.attrs.eventid === eventId
    ) {
      const { on = {} } = _vnode.data;

      Object.keys(on).forEach(etype => {
        if (eventTypes.includes(etype)) {
          events.push(on[etype]);
        }
      });
    }
  }

  return events;
}

export function handleProxy(e) {
  const events = getEvents(this._vnode, e);
  events.forEach(event => event());
}
