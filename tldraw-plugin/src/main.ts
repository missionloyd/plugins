import { SAGE3Plugin } from "@sage3/sageplugin";

// You Plugin app state type
type TLDrawState = {
  url: string;
};

// Intialize the SAGE3Plugin.
const s3api = new SAGE3Plugin<TLDrawState>();

// Subscribe to updates from the SAGE3 server when other clients update the state.
s3api.subscribeToUpdates((state) => {
  const uuid = state._id;

  // https://www.tldraw.com/r/${uuid}?viewport=0,0,800,600&page=page:page
  const draw_url = `https://www.tldraw.com/r/sage3-${uuid}`;

  // Save the URL to the state, just in case
  s3api.update({ state: { url: draw_url } });

  // Load the URL in the iframe.
  window.location.href = draw_url;
});
