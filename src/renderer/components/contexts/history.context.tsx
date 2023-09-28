import {
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// TODO
// Later to make it as state controlled
const historyFilePath = '/home/p10/Documents/genai/historytest.txt';

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
  historyArray: IHistory[] | null;
  addHistory: () => (appendData: string) => Promise<boolean>;
  clearHistory: () => Promise<boolean>;
  setHistoryCleared: React.Dispatch<SetStateAction<boolean>>;
  setHistoryAppendedToggle: React.Dispatch<SetStateAction<boolean>>;
  activeSelectedHistory: IHistory | null;
  setActiveSelectedHistory: React.Dispatch<SetStateAction<IHistory | null>>;
}

const historyContext = createContext<IContextValue>({
  historyArray: null,
  addHistory: () => () => Promise.resolve(true),
  clearHistory: () => Promise.resolve(true),
  setHistoryCleared: () => {},
  setHistoryAppendedToggle: () => {},
  activeSelectedHistory: null,
  setActiveSelectedHistory: () => {},
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

  console.log('history array', historyArray);
  return historyArray;
};

export const HistoryProvider = ({ children }: IHistoryProviderProps) => {
  const [history, setHistory] = useState('');
  const [historyAppendedToggle, setHistoryAppendedToggle] = useState(false);
  const [activeSelectedHistory, setActiveSelectedHistory] =
    useState<IHistory | null>(null);
  const [historyCleared, setHistoryCleared] = useState(false);

  useEffect(() => {
    const readHistoryFile = async () => {
      const data: { [k: string]: string } | string = await (
        window as any
      ).osConnectBridge.readFile(historyFilePath);
      if (typeof data === 'string') {
        setHistory(data);
      }
    };

    readHistoryFile();
  }, [historyAppendedToggle, historyCleared]);

  // method to add to history context

  const addHistory = () => {
    return async (appendData: string) => {
      const response = await (window as any).osConnectBridge.appendFile(
        historyFilePath,
        appendData,
      );
      if (typeof response === 'boolean' && response === true) {
        return true;
      } else return false;
    };
  };

  const clearHistory = async () => {
    const response = await (window as any).osConnectBridge.writeFile(
      historyFilePath,
      '',
    );

    return typeof response === 'boolean' ? true : false;
  };

  let historyArray: IHistory[] | null = null;

  if (!!history) {
    historyArray = convertTextToHistoryArray(history);
  }

  const contextValue: IContextValue = {
    historyArray,
    addHistory,
    clearHistory,
    setHistoryCleared,
    setHistoryAppendedToggle,
    activeSelectedHistory,
    setActiveSelectedHistory,
  };

  return (
    <historyContext.Provider value={contextValue}>
      {children}
    </historyContext.Provider>
  );
};

export default HistoryProvider;
export const useHistory = () => useContext(historyContext);
