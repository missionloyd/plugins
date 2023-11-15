import { SAGE3Plugin } from "@sage3/sageplugin";

// You Plugin app state type
type EtherpadState = {
  url: string;
};

// Intialize the SAGE3Plugin.
const s3api = new SAGE3Plugin<EtherpadState>();

// Subscribe to updates from the SAGE3 server when other clients update the state.
s3api.subscribeToUpdates((state) => {
  console.log("state", state);
  const uuid = state._id;

  // &userName=sage
  const url = `https://etherpad.nrp-nautilus.io/p/sage3-${uuid}?showChat=false&showLineNumbers=true&useMonospaceFont=false&noColors=false`;

  // Save the URL to the state, just in case
  s3api.update({ state: { url: url } });

  // Load the URL in the iframe.
  window.location.href = url;
});
