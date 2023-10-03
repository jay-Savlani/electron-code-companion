import {
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface IHistory {
  title: string;
  date: string;
  input: string;
  output: string;
  analysis: string;
}

interface IHistoryProviderProps {
  children: ReactElement;
}

interface IContextValue {
  historyFile: string;
  setHistoryFile: React.Dispatch<SetStateAction<string>>;
  historyArray: IHistory[] | null;
  addHistory: () => (appendData: string) => Promise<boolean>;
  clearHistory: () => Promise<boolean>;
  setHistoryCleared: React.Dispatch<SetStateAction<boolean>>;
  setHistoryAppendedToggle: React.Dispatch<SetStateAction<boolean>>;
  activeSelectedHistory: IHistory | null;
  setActiveSelectedHistory: React.Dispatch<SetStateAction<IHistory | null>>;
  loading: boolean;
}

const historyContext = createContext<IContextValue>({
  historyFile: '',
  setHistoryFile: () => {},
  historyArray: null,
  addHistory: () => () => Promise.resolve(true),
  clearHistory: () => Promise.resolve(true),
  setHistoryCleared: () => {},
  setHistoryAppendedToggle: () => {},
  activeSelectedHistory: null,
  setActiveSelectedHistory: () => {},
  loading: false,
});

const convertTextToHistoryArray = (data: string): IHistory[] => {
  const historyChunks = data.split('****');

  const historyArray = historyChunks.reduce((arr, historyChunk) => {
    const _arr = historyChunk.split('***');

    if (!(_arr[0] && _arr[1])) return arr;

    const obj: IHistory = {
      title: _arr[0],
      date: _arr[1],
      input: _arr[2],
      output: _arr[3],
      analysis: _arr[4],
    };

    arr.push(obj);

    return arr;
  }, [] as IHistory[]);

  return historyArray;
};

// /home/p10/Documents/genai/historytest.txt

const getHistoryPath = (pathConfig: string) => {
  return pathConfig.split(' ')[1];
};

export const HistoryProvider = ({ children }: IHistoryProviderProps) => {
  const [historyFile, setHistoryFile] = useState('');
  const [history, setHistory] = useState('');
  const [historyAppendedToggle, setHistoryAppendedToggle] = useState(false);
  const [activeSelectedHistory, setActiveSelectedHistory] =
    useState<IHistory | null>(null);
  const [historyCleared, setHistoryCleared] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const readOrSetupConfig = async () => {
      const configFile =
        (await (window as any).osConnectBridge.getConfigFile()) || '';

      const data: { [k: string]: string } | string = await (
        window as any
      ).osConnectBridge.readFile(configFile);

      if (typeof data !== 'string') {
        const status = await (window as any).osConnectBridge.setupConfig();
        if (!status) return;
      } else {
        const historyPath = getHistoryPath(data);
        setHistoryFile(historyPath);
      }
    };

    const changeHistoryPathInConfig = async (historyFile: string) => {
      const configFile =
        (await (window as any).osConnectBridge.getConfigFile()) || '';

      await (window as any).osConnectBridge.writeFile(
        configFile,
        `path ${historyFile}`,
      );
    };

    if (!historyFile) {
      readOrSetupConfig();
    }
    // change history file for path config
    else {
      changeHistoryPathInConfig(historyFile);
    }
  }, [historyFile]);

  useEffect(() => {
    const readHistoryFile = async () => {
      const data: { [k: string]: string } | string = await (
        window as any
      ).osConnectBridge.readFile(historyFile);

      if (typeof data === 'string') {
        setHistory(data);
      }
    };

    setLoading(true);

    readHistoryFile();

    setLoading(false);
  }, [historyAppendedToggle, historyCleared, historyFile]);

  // method to add to history context

  const addHistory = () => {
    return async (appendData: string) => {
      const response = await (window as any).osConnectBridge.appendFile(
        historyFile,
        appendData,
      );
      if (typeof response === 'boolean' && response === true) {
        return true;
      } else return false;
    };
  };

  const clearHistory = async () => {
    const response = await (window as any).osConnectBridge.writeFile(
      historyFile,
      '',
    );

    return typeof response === 'boolean' ? true : false;
  };

  let historyArray: IHistory[] | null = null;

  historyArray = useMemo(() => convertTextToHistoryArray(history), [history]);

  const contextValue: IContextValue = {
    historyFile,
    setHistoryFile,
    historyArray,
    addHistory,
    clearHistory,
    setHistoryCleared,
    setHistoryAppendedToggle,
    activeSelectedHistory,
    setActiveSelectedHistory,
    loading,
  };

  return (
    <historyContext.Provider value={contextValue}>
      {children}
    </historyContext.Provider>
  );
};

export default HistoryProvider;
export const useHistory = () => useContext(historyContext);
