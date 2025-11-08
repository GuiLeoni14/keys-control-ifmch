import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "./providers";

export const metadata: Metadata = {
  title: "Controle de Chaves - Campus Machado",
  description: "Sistema de controle de chaves dos laboratórios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
