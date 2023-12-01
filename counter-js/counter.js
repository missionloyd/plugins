import { SAGE3Plugin } from "https://unpkg.com/@sage3/sageplugin@0.0.15/src/lib/sageplugin.js";

// The local variable we are syncing
let counter = 0;

// Intialize the SAGE3Plugin.
// Only intalize once. Utilize it as a singleton throughout your app.
const s3api = new SAGE3Plugin();

// Subscribe to updates from the SAGE3 server when other clients update the state.
s3api.subscribeToUpdates((state) => {
  if (state.data.state.count) {
    // update the local counter value
    counter = state.data.state.count;
    // update the DOM
    counterValue.innerHTML = counter;
  }
});

const counterValue = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.querySelector("#reset");

// To increment the value of counter
incrementBtn.addEventListener("click", () => {
  counter++;
  counterValue.innerHTML = counter;
  // Push an update to the SAGE3 server.
  s3api.update({ state: { count: counter } });
});

// To decrement the value of counter
decrementBtn.addEventListener("click", () => {
  counter--;
  counterValue.innerHTML = counter;
  // Push an update to the SAGE3 server.
  s3api.update({ state: { count: counter } });
});

// To reset the counter to zero
resetBtn.addEventListener("click", reset);

function reset() {
  counter = 0;
  counterValue.innerHTML = counter;
  // Push an update to the SAGE3 server.
  s3api.update({ state: { count: counter } });
}
