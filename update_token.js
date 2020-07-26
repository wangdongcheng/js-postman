const request = require("request");
const fs = require("fs");
const options = require("./config/option.json");

let opt_token = options.option_token;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const upd_token = response => {
    let ck = "";
    options.csrf_new = response.headers["x-csrf-token"];
    response.headers["set-cookie"].forEach(v => {
        ck += `${v};`;
    })
    options.cookie_new = ck;

    fs.writeFileSync("./config/option.json", JSON.stringify(options, null, 2));
    console.log(`New csrf token: ${options.csrf_new}`);
    console.log(`New cookie: ${options.cookie_new}`);
}


request(opt_token, (error, response) => {
    if (error) throw new Error(error);
    upd_token(response);
});

