import {createStore} from 'zustand/vanilla';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {connectors} from '../connectors';
import {Connector} from '../connectors/Connector';
import {Route} from '../components/routes';
import {ConnectorFilter} from '../types/ConnectorFilter';
import {WebLNProvider} from '@webbtc/webln-types';
import {WebLNProviderConfig} from '../types/WebLNProviderConfig';

interface Store {
  readonly route: Route;
  readonly routeHistory: Route[];
  readonly connected: boolean;
  readonly connecting: boolean;
  readonly showBalance: boolean | undefined;
  readonly connectorName: string | undefined;
  readonly appName: string | undefined;
  readonly filters: ConnectorFilter[] | undefined;
  readonly error: string | undefined;
  readonly modalOpen: boolean;
  readonly provider: WebLNProvider | undefined;
  readonly currency: string | undefined;
  readonly providerConfig: WebLNProviderConfig | undefined;
  readonly connector: Connector | undefined;
  readonly config: ConnectorConfig | undefined;

  connect(config: ConnectorConfig): void;
  disconnect(): void;
  pushRoute(route: Route): void;
  popRoute(): void;
  setAppName(appName: string | undefined): void;
  setShowBalance(showBalance: boolean | undefined): void;
  setProviderConfig(providerConfig: WebLNProviderConfig | undefined): void;
  setFilters(filters: ConnectorFilter[] | undefined): void;
  setError(error: string | undefined): void;
  clearRouteHistory(): void;
  setModalOpen(modalOpen: boolean): void;
  setCurrency(currency: string | undefined): void;

  // provider functions
  // getBalance(): Promise<number | undefined>;
  // getAlias(): Promise<string | undefined>;
}

const store = createStore<Store>((set, get) => ({
  route: '/start',
  routeHistory: [],
  modalOpen: false,
  currency: undefined,
  showBalance: undefined,
  connected: false,
  connecting: false,
  error: undefined,
  alias: undefined,
  balance: undefined,
  connectorName: undefined,
  appName: undefined,
  filters: undefined,
  invoice: undefined,
  provider: undefined,
  providerConfig: undefined,
  connector: undefined,
  config: undefined,
  connect: async (config: ConnectorConfig) => {
    set({
      connecting: true,
      error: undefined,
    });
    try {
      const connector = new connectors[config.connectorType](config);
      const provider = await connector.init();
      await provider.enable();
      set({
        config,
        connector,
        connected: true,
        connecting: false,
        provider,
        connectorName: config.connectorName,
        route: '/start',
      });
      saveConfig(config);
    } catch (error) {
      console.error(error);
      set({
        error: (error as Error).toString(),
        connecting: false,
      });
      get().disconnect();
      // TODO: throw new ConnectFailedError(error);
    }
  },
  disconnect: () => {
    get().connector?.unload();
    set({
      config: undefined,
      connector: undefined,
      connected: false,
      connectorName: undefined,
      provider: undefined,
      modalOpen: false,
    });
    deleteConfig();
  },
  // TODO: support passing route parameters as a second argument
  pushRoute: (route: Route) => {
    if (get().route === route) {
      return;
    }
    set({route, routeHistory: [...get().routeHistory, get().route]});
  },
  popRoute() {
    const routeHistory = get().routeHistory;
    const newRoute = routeHistory.pop() || '/start';
    set({
      route: newRoute,
      routeHistory,
    });
  },
  clearRouteHistory() {
    set({
      route: '/start',
      routeHistory: [],
    });
  },
  setModalOpen: (modalOpen) => {
    set({modalOpen});
  },
  setAppName: (appName) => {
    set({appName});
  },
  setShowBalance: (showBalance) => {
    set({showBalance});
  },
  setFilters: (filters) => {
    set({filters});
  },
  setProviderConfig: (providerConfig) => {
    set({providerConfig});
  },
  setError: (error) => {
    set({error});
  },
  setCurrency: (currency) => {
    if (currency) {
      window.localStorage.setItem('bc:currency', currency);
    } else {
      window.localStorage.removeItem('bc:currency');
    }
    set({currency});
  },
}));

export default store;

function deleteConfig() {
  window.localStorage.removeItem('bc:config');
}

function saveConfig(config: ConnectorConfig) {
  window.localStorage.setItem('bc:config', JSON.stringify(config));
}
