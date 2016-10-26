var http = require("http");
var iconv = require('iconv-lite');
var option = {
    hostname: "stockdata.stock.hexun.com",
    path: "/gszl/s601398.shtml"
};
var req = http.request(option, function (res) {
    res.on("data", function (chunk) {
        console.log(iconv.decode(chunk, "gbk"));
    });
}).on("error", function (e) {
    console.log(e.message);
});
req.end();