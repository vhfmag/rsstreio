declare module "brazuka-correios" {
  export interface TrackingEntry {
    data: string;
    origem: string;
    destino: string;
    status: string;
  }

  const correios: {
    rastrearObjeto(
      code: string
    ): Promise<{ status_code: number; rastreio: TrackingEntry[] }>;
  };
  export default correios;
}
