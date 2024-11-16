import { createConfig, http } from '@wagmi/core'
import { rootstockTestnet, mantleSepoliaTestnet} from 'viem/chains';


export const config = createConfig({
  chains: [rootstockTestnet, mantleSepoliaTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [rootstockTestnet.id]: http(rootstockTestnet.rpcUrls.default.http[0]),
    [mantleSepoliaTestnet.id]: http(mantleSepoliaTestnet.rpcUrls.default.http[0]),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
