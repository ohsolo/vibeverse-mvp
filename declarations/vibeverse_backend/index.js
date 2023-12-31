import { Actor, HttpAgent } from '@dfinity/agent';

// Imports and re-exports candid interface
import { idlFactory } from './vibeverse_backend.did.js';
export { idlFactory } from './vibeverse_backend.did.js';

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  process.env.NEXT_PUBLIC_CANISTER_ID_VIBEVERSE_BACKEND ||
  process.env.NEXT_PUBLIC_VIBEVERSE_BACKEND_CANISTER_ID;

export const createActor = (canisterId, options = {}) => {
  //const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  /*const agent = new HttpAgent({
    host: `http://127.0.0.1:4943/?canisterId=ahw5u-keaaa-aaaaa-qaaha-cai&id=aovwi-4maaa-aaaaa-qaagq-cai`,
  });*/
  const agent = new HttpAgent({
    host: `https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io`,
    ...options.agentOptions,
  });

  if (options.agent && options.agentOptions) {
    console.warn(
      'Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.',
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== 'ic') {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        'Unable to fetch root key. Check to ensure that your local replica is running',
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const vibeverse_backend = createActor(canisterId);
