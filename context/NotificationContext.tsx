import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface NotificationContextType {
  notifikasi: string[];
  jumlahNotifikasi: number;
  tambahNotifikasi: (pesan: string) => void;
  hapusSemua: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifikasi, setNotifikasi] = useState<string[]>([]);

  const tambahNotifikasi = useCallback((pesan: string) => {
    const bersih = pesan.trim();
    if (bersih === "") return;
    setNotifikasi((prev) => [bersih, ...prev]);
  }, []);

  const hapusSemua = useCallback(() => {
    setNotifikasi([]);
  }, []);

  const jumlahNotifikasi = useMemo(() => notifikasi.length, [notifikasi]);

  const value = useMemo(
    () => ({
      notifikasi,
      jumlahNotifikasi,
      tambahNotifikasi,
      hapusSemua,
    }),
    [notifikasi, jumlahNotifikasi, tambahNotifikasi, hapusSemua]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
