import axios from "axios";
import * as cheerio from "cheerio";
import * as https from "https";

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const getTasa = async (url: string) => {
    const response = await axios.get(url, { httpsAgent });
    const html = response.data;

    const $ = cheerio.load(html);

    const dolar = $('#dolar').text().trim().replace(',' , ',').split(' ');

    const tasa = parseFloat(dolar[dolar.length - 1]);
    return tasa
}

const addTasa = async () => {
    const tasa = await getTasa('https://www.bcv.org.ve/');

    return tasa
}

export {getTasa, addTasa}