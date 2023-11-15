import correios from "brazuka-correios";
import { cleanUpString } from "$lib/utils/parse";

const DATETIME_PARSER_REGEX =
  /^\s*Data.*:.*(?<dia>\d{2})\/(?<mes>\d{2})\/(?<ano>\d{4}).*Hora(?:.*):.*(?<hora>\d{2}):(?<minuto>\d{2})\s*$/;

/** @param {string} datetimeDescription */
function datetimeDescriptionToDate(datetimeDescription: string) {
  const match = DATETIME_PARSER_REGEX.exec(datetimeDescription);

  if (!match || !match.groups) {
    throw new Error("Invalid datetime description");
  }

  const { dia, mes, ano, hora, minuto } = match.groups;
  const date = new Date(+ano, +mes - 1, +dia, +hora, +minuto);

  return date;
}

export async function GET({ params: { code } }) {
  const { rastreio, status_code: statusCode } = await correios.rastrearObjeto(code);

  if (statusCode !== 200) {
    return new Response(undefined, { status: statusCode });
  }

  // TODO: dedup
  return new Response(
    JSON.stringify(
      rastreio.map(({ status, data, ...rest }) => ({
        status: cleanUpString(status),
        data: datetimeDescriptionToDate(data)?.toISOString(),
        ...("local" in rest
          ? {
              local: cleanUpString(rest.local),
            }
          : {
              origem: cleanUpString(rest.origem),
              destino: cleanUpString(rest.destino),
            }),
      })),
    ),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=10800",
      },
    },
  );
}
