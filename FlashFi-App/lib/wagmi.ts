import { createConfig, http } from '@wagmi/core'
import { rootstockTestnet, mantaSepoliaTestnet } from 'viem/chains';


export const config = createConfig({
  chains: [rootstockTestnet, mantaSepoliaTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [rootstockTestnet.id]: http(rootstockTestnet.rpcUrls.default.http[0]),
    [mantaSepoliaTestnet.id]: http(mantaSepoliaTestnet.rpcUrls.default.http[0]),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
