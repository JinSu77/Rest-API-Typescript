"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emailer = void 0;
const node_mailjet_1 = require("node-mailjet");
class Emailer {
    constructor() {
        this.client = new node_mailjet_1.Client({
            apiKey: process.env.MJ_APIKEY || 'e1d1cb4dba76fa67f4ef3ea22aa79318',
            apiSecret: process.env.MJ_APISECRET || '3ffdd1994094cdcf0c7d0ba067cc39bf'
        });
    }
    async sendMagicLink(to, link, title) {
        console.info('Sending magic link to: ' + to);
        console.log(link);
        const emailBody = {
            Messages: [
                {
                    From: {
                        Email: process.env.MJ_EMAIL_FROM || 'a_ha@hetic.eu',
                        Name: process.env.MJ_EMAIL_NAME || 'Adrien HA'
                    },
                    To: [
                        {
                            Email: to,
                        },
                    ],
                    Subject: title.toUpperCase() + " : Votre lien magique",
                    HTMLPart: `
<p>Bonjour,</p>
<p>Cliquez sur le lien afin de vous identifier. Le lien sera valable pendant 30 minutes.</p>
<p><a href=" + ${link} + ">Connexion</a>
<p>Si le lien dessus ne fonctionne pas, copiez/collez le lien suivant dans votre navigateur :</a>
<pre>${link}</pre>
`
                },
            ],
        };
        const result = await this.client
            .post('send', { version: 'v3.1' })
            .request(emailBody);
    }
}
exports.Emailer = Emailer;
