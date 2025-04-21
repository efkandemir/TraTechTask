import { useEffect, useRef, useState, useCallback } from 'react';

type OrderLevel = {
  price: number;
  qty: number;
};

type KrakenBookDataReturn = {
  bids: OrderLevel[];
  asks: OrderLevel[];
  refetch: () => void;
};

const SOCKET_URL = 'wss://ws.kraken.com/v2';

const KrakenBookData = (symbol: string): KrakenBookDataReturn => {
  const ws = useRef<WebSocket | null>(null);
  const activeSymbol = useRef<string>(symbol);
  const [asks, setAsks] = useState<OrderLevel[]>([]);
  const [bids, setBids] = useState<OrderLevel[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    activeSymbol.current = symbol;

    setAsks([]);
    setBids([]);

    ws.current = new WebSocket(SOCKET_URL);

    ws.current.onopen = () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        const subscribeMessage = {
          method: 'subscribe',
          params: {
            channel: 'book',
            symbol: [symbol],
            depth: 10,
            snapshot: true,
          },
        };
        ws.current.send(JSON.stringify(subscribeMessage));
      }
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message?.type === 'snapshot' || message?.type === 'update') {
        const book = message.data?.[0];
        if (!book) return;

        if (activeSymbol.current !== symbol) return;

        if (book.asks) {
          setAsks(prev => {
            if (message.type === 'snapshot') {
              return book.asks.map(({ price, qty }: any) => ({
                price: parseFloat(price),
                qty: parseFloat(qty),
              })).sort((a: OrderLevel, b: OrderLevel) => a.price - b.price);
            }

            return mergeLevels(prev, book.asks);
          });
        }

        if (book.bids) {
          setBids(prev => {
            if (message.type === 'snapshot') {
              return book.bids.map(({ price, qty }: any) => ({
                price: parseFloat(price),
                qty: parseFloat(qty),
              })).sort((a: OrderLevel, b: OrderLevel) => b.price - a.price);
            }
            return mergeLevels(prev, book.bids);
          });
        }
      }
    };

    return () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [symbol, refreshTrigger]);

  return { asks, bids, refetch };
};

function mergeLevels(
  prevLevels: OrderLevel[],
  updates: { price: number; qty: number }[],
): OrderLevel[] {
  const map = new Map(prevLevels.map(level => [level.price, level.qty]));
  updates.forEach(({ price, qty }) => {
    if (qty === 0) {
      map.delete(price);
    } else {
      map.set(price, qty);
    }
  });
  return Array.from(map.entries())
    .map(([price, qty]) => ({ price: parseFloat(price.toString()), qty }))
    .sort((a, b) => a.price - b.price);
}

export default KrakenBookData;
