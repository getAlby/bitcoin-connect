import {createStore} from 'zustand/vanilla';
import {ConnectorConfig} from '../types/ConnectorConfig';
import {connectors} from '../connectors';
import {Connector} from '../connectors/Connector';
import {Route} from '../components/routes';
import {ConnectorFilter} from '../types/ConnectorFilter';
import {WebLNProvider} from '@webbtc/webln-types';

interface PrivateStore {
  readonly connector: Connector | undefined;
  readonly config: ConnectorConfig | undefined;
  setConfig(config: ConnectorConfig | undefined): void;
  setConnector(connector: Connector | undefined): void;
}

const privateStore = createStore<PrivateStore>((set) => ({
  connector: undefined,
  config: undefined,
  setConfig: (config) => {
    set({config});
  },
  setConnector: (connector) => {
    set({connector});
  },
}));

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

  connect(config: ConnectorConfig): void;
  disconnect(): void;
  pushRoute(route: Route): void;
  popRoute(): void;
  setAppName(appName: string | undefined): void;
  setShowBalance(showBalance: boolean | undefined): void;
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
  connect: async (config: ConnectorConfig) => {
    set({
      connecting: true,
      error: undefined,
    });
    try {
      const connector = new connectors[config.connectorType](config);
      const provider = await connector.init();
      await provider.enable();
      privateStore.getState().setConfig(config);
      privateStore.getState().setConnector(connector);
      set({
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
    privateStore.getState().connector?.unload();
    privateStore.getState().setConfig(undefined);
    privateStore.getState().setConnector(undefined);
    set({
      connected: false,
      connectorName: undefined,
      provider: undefined,
      modalOpen: false,
    });
    deleteConfig();
  },
  getConnectorName: () => privateStore.getState().config?.connectorName,
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

  /*async getBalance() {
    try {
      if (!window.webln) {
        throw new Error('webln not found');
      }
      const balanceResponse = await window.webln.getBalance?.();
      return balanceResponse?.balance;
    } catch (error) {
      console.error('Failed to get balance', error);
    }
    return undefined;
  },
  async getAlias() {
    try {
      if (!window.webln) {
        throw new Error('webln not found');
      }
      const info = await window.webln.getInfo();
      return info.node.alias;
    } catch (error) {
      console.error('Failed to get alias', error);
      return undefined;
    }
  },*/
}));

export default store;

function deleteConfig() {
  window.localStorage.removeItem('bc:config');
}

function saveConfig(config: ConnectorConfig) {
  window.localStorage.setItem('bc:config', JSON.stringify(config));
}
