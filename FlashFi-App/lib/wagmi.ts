import { createConfig, http } from '@wagmi/core'
import { rootstockTestnet, mantleSepoliaTestnet, celoAlfajores, baseSepolia , arbitrumSepolia, scrollSepolia } from 'viem/chains';


export const config = createConfig({
  chains: [rootstockTestnet, mantleSepoliaTestnet, celoAlfajores, baseSepolia, arbitrumSepolia, scrollSepolia],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [rootstockTestnet.id]: http(rootstockTestnet.rpcUrls.default.http[0]),
    [mantleSepoliaTestnet.id]: http(mantleSepoliaTestnet.rpcUrls.default.http[0]),
    [celoAlfajores.id]: http(celoAlfajores.rpcUrls.default.http[0]),
    [baseSepolia.id]: http(baseSepolia.rpcUrls.default.http[0]),
    [arbitrumSepolia.id]: http(arbitrumSepolia.rpcUrls.default.http[0]),
    [scrollSepolia.id]: http(scrollSepolia.rpcUrls.default.http[0]),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
