import { useState } from "react";

export const useFetchClient = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async (request: () => Promise<T>): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await request();
      setData(response);
    } catch (err) {
      setError(err as Error);
      throw err; // Re-throw the error to propagate it
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, loadData };
};
