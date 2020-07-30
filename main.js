const request = require("request");
const options = require("./config/option.json");
let opt = options.option_crt_sgl;
opt.body = options.body_crt;

if (opt.headers["x-csrf-token"] !== options.csrf_new) {
    opt.headers["x-csrf-token"] = options.csrf_new;
}
if (opt.headers.Cookie !== options.cookie_new) {
    opt.headers.Cookie = options.cookie_new;
}

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const start = Date.now();
let count = 0;
const req = option => {
    // let start = Date.now();
    return new Promise(resolve => {
        request(option, (error, response) => {
            if (error) throw new Error(error);
            if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 202) {
                count++;
                console.log(`No. ${count} New accrual obj: ${JSON.parse(response.body).d.AccrualObject}`, Date.now() - start);
                resolve();
            }
        });
    })
}

for (let i = 0; i < 300; ++i) {
    req(opt)
        .then(req(opt))
        .then(req(opt))
        .then(req(opt))
        .then(req(opt));
}