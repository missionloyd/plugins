import { SAGE3Plugin } from "@sage3/sageplugin";

// You Plugin app state type
type EtherpadState = {
  url: string;
};

// Intialize the SAGE3Plugin.
const s3api = new SAGE3Plugin<EtherpadState>();

// Subscribe to updates from the SAGE3 server when other clients update the state.
s3api.subscribeToUpdates((state, user) => {
  console.log("Etherpad state>", user);
  const uuid = state._id;

  let url: string;
  if (user) {
    const username = encodeURIComponent(user);
    console.log("s3api.subscribeToUpdates ~ username:", username);
    url = `https://etherpad.nrp-nautilus.io/p/sage3-${uuid}?showChat=false&showLineNumbers=true&useMonospaceFont=false&noColors=false&userName=${username}`;
  } else {
    url = `https://etherpad.nrp-nautilus.io/p/sage3-${uuid}?showChat=false&showLineNumbers=true&useMonospaceFont=false&noColors=false`;
  }

  // Save the URL to the state, just in case
  s3api.update({ state: { url: url } });

  // Load the URL in the iframe.
  window.location.href = url;
});
