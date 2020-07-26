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

request(opt, (error, response) => {
    if (error) throw new Error(error);
    console.log(`New accrual obj: ${JSON.parse(response.body).d.AccrualObject}`);
});
