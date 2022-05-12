const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { faker } = require('@faker-js/faker');
const proxy = require("node-global-proxy").default;
const ethers = require('ethers');
const moment = require('moment');
const chalk = require('chalk');

function getString(start, end, all) {
    const regex = new RegExp(`${start}(.*?)${end}`);
    const str = all
    const result = regex.exec(str);
    return result;
}


const checkIp = () => {
    const res = fetch('https://ipv4.icanhazip.com')
        .then(res => res.text())
        .then(res => { return res })
        .catch(err => {
            return err;
        });
    return res;
};


const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });


const fakeName = () => {
    const randomName = faker.name.findName().toLowerCase();
    const random1 = faker.word.adjective().toLowerCase();
    const random2 = faker.word.adverb().toLowerCase();
    const name = random1 + randomName;
    const result = {
        firstName: random1.replace(/\s/g, ""),
        lastName: randomName.replace(/\s/g, ""),
        name: name.replace(/\s/g, "")
    }
    return result
};


const getEmailRandom = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const result = [];
            $('.e7m.tt-suggestions').find('div > p').each(function (index, element) {
                result.push($(element).text());
            });
            resolve(result);
        })
        .catch(err => reject(err));
});


const functionGetLink = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${email}`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br",
            cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
            "upgrade-insecure-requests": 1,
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy.plain > p").text()
            resolve(src);
        })
        .catch(err => reject(err));
});

const getReff = (reff) => new Promise((resolve, reject) => {
    fetch('https://app.step.app/?r=' + reff, {
        headers: {
            'authority': 'app.step.app',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'id-ID,id;q=0.9',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
        }
    })
        .then(res => res.text())
        .then(async res => {
            const result = await getString('G-', '"', res)[1];
            resolve(result)
        })
        .catch(err => reject(err));
});


const sendOtp = (email) => new Promise((resolve, reject) => {
    fetch('https://api.step.app/v1/auth/otp-code?email=' + email, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'id-ID,id;q=0.9',
            'Connection': 'keep-alive',
            'Origin': 'https://app.step.app',
            'Referer': 'https://app.step.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        }
    })
        .then(res => res.text())
        .then(res => {

            resolve(res)
        })
        .catch(err => reject(err));
});

const veryfOtp = (email, otp, reffREsult) => new Promise((resolve, reject) => {
    fetch(`https://api.step.app/v1/auth/token?email=${email}&code=${otp}`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'id-ID,id;q=0.9',
            'Connection': 'keep-alive',
            'Cookie': `_ga_${reffREsult}=GS1.1.1652254647.1.0.1652254647.0; _ga=GA1.1.1871310303.1652254647`,
            'Origin': 'https://app.step.app',
            'Referer': 'https://app.step.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        }
    })
        .then(res => res.json())
        .then(res => {

            resolve(res)
        })
        .catch(err => reject(err));
});

const addWallet = (bearer, wallet) => new Promise((resolve, reject) => {
    fetch('https://api.step.app/v1/user/me', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'id-ID,id;q=0.9',
            'Authorization': `Bearer ${bearer}`,
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'https://app.step.app',
            'Referer': 'https://app.step.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        },
        body: JSON.stringify({
            'wallet': wallet
        })
    })
        .then(res => res.text())
        .then(res => {

            resolve(res)
        })
        .catch(err => reject(err));
});

const addReff = (reff, token) => new Promise((resolve, reject) => {
    fetch('https://api.step.app/v1/user/me', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'id-ID,id;q=0.9',
            'Authorization': `Bearer ${token}`,
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'https://app.step.app',
            'Referer': 'https://app.step.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        },
        body: JSON.stringify({
            'referrer': reff
        })
    })
        .then(res => res.text())
        .then(res => {

            resolve(res)
        })
        .catch(err => reject(err));
});

(async () => {

    // const proxyUrl = '';
    // if (!proxyUrl) {
    //     console.log('Harap masukan proxy, untuk auto check dan submit eglibleity. ( resedential / proxy rotator) (line 156)')
    //     process.exit(0);
    // }

    const reff = 'W9KZ7CW6';

    if (!reff) {
        console.log('Harap masukan kode refferal')
        process.exit(0);
    }


    while (true) {
        
    
        // await proxy.setConfig(proxyUrl);
        // await proxy.start();

        const reffREsult = await getReff();

        const domainList = await getEmailRandom();
        const domain = domainList[Math.floor(Math.random() * domainList.length)];

        const name = fakeName().name.replace("'", '');
        const email = `${name}${await randstr(5)}@${domain}`;

        console.log('')
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Registering email ${email}`));
        const sendOtpResult = await sendOtp(email);

        if (sendOtpResult.includes('OK')) {

            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Waiting otp.`));

            let linkVerification;
            do {
                linkVerification = await functionGetLink(email.split('@')[0], email.split('@')[1]);
            } while (!linkVerification)

            const otp = linkVerification.split(':')[1].trim();
            const verificationOtpResult = await veryfOtp(email, otp, reffREsult);

            if (verificationOtpResult.access) {


                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Success verify OTP`));

                const addReffResult = await addReff(reff, verificationOtpResult.access.token);

                if (addReffResult.includes('OK')) {
                    console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`success add reff.`));
                    const wallet = ethers.Wallet.createRandom();
                    const addWalletResult = await addWallet(verificationOtpResult.access.token, wallet.address);

                    if (addWalletResult.includes('OK')) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`success add wallet.`));
                    } else {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`failed add wallet.`));
                    }
                } else {
                    console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`failed add reff.`));
                }


            } else {
                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Failed veryf OTP.`));
            }

        } else {
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Failed send OTP.`));
        }
        // await proxy.stop();
    }

})();
