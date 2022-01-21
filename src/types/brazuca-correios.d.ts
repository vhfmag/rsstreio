declare module "brazuka-correios" {
  interface BaseTrackingEntry {
    data: string;
    status: string;
  }

  export interface NewTrackingEntry extends BaseTrackingEntry {
    local: string;
  }

  export interface OldTrackingEntry extends BaseTrackingEntry {
    origem: string;
    destino: string;
  }

  export type TrackingEntry = NewTrackingEntry | OldTrackingEntry;

  const correios: {
    rastrearObjeto(
      code: string
    ): Promise<{ status_code: number; rastreio: TrackingEntry[] }>;
  };

  export default correios;
}
