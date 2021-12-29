import correios from "brazuka-correios";

const DATETIME_PARSER_REGEX = /^\s*Data.*:.*(?<dia>\d{2})\/(?<mes>\d{2})\/(?<ano>\d{4}).*Hora(?:.*):.*(?<hora>\d{2}):(?<minuto>\d{2})\s*$/;

/** @param {string} datetimeDescription */
function datetimeDescriptionToDate(datetimeDescription) {
    const match = DATETIME_PARSER_REGEX.exec(datetimeDescription);
    if (!match || !match.groups) {
        return null;
    }

    const { dia, mes, ano, hora, minuto } = match.groups;
    const date = new Date(+ano, +mes - 1, +dia, +hora, +minuto);

    return date;
}

export async function get({ params: { code } }) {
    const { rastreio, status_code: statusCode } = await correios.rastrearObjeto(code);

    if (statusCode !== 200) {
        return {
            status: statusCode,
        };
    }

    // TODO: dedup
    return {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=10800" },
        body: rastreio.map(({ status, data, origem, destino }) => ({
            status: status.slice(8),
            data: datetimeDescriptionToDate(data)?.toISOString(),
            origem: origem.slice(8),
            destino: destino.slice(9),
        })),
    };
}
