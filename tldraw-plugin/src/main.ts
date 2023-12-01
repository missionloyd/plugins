import { SAGE3Plugin } from "@sage3/sageplugin";

// You Plugin app state type
type TLDrawState = {
  url: string;
};

// Intialize the SAGE3Plugin.
const s3api = new SAGE3Plugin<TLDrawState>();

let initialized = false;
let app_id = "";
let username = "";

// Subscribe to updates from the SAGE3 server when other clients update the state.
s3api.subscribeToUpdates((state, user) => {
  console.log("TLDdraw update");
  if (!initialized) {
    app_id = state._id;
    username = user;
    initialized = true;
    console.log("TLDdraw initialized", app_id, username);
  }

  if (initialized) {
    // https://www.tldraw.com/r/${uuid}?viewport=0,0,800,600&page=page:page
    const draw_url = `https://www.tldraw.com/r/sage3-${app_id}`;

    // Save the URL to the state, just in case
    s3api.update({ state: { url: draw_url } });

    // Load the URL in the iframe.
    window.location.href = draw_url;
  }
});
