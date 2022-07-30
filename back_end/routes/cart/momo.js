var crypto = require('crypto')
var https = require('https')

async function momoCall(props, Client){
    return new Promise( resolve =>{
        var partnerCode = "MOMOXQEO20220611";
        var accessKey = "AOjvfOzkjYrsczCz";
        var secretkey = "8Zz2FMDm7Be2tOVf2DFhwR9LlVvv3Doj";
        var requestId = partnerCode + new Date().getTime();
        var orderId = Client.makh + '_' + requestId;
        var orderInfo = "Thành viên " + Client.tenkh + " thực hiện thanh toán";
        var redirectUrl = process.env.HOST+"/cart/order_create/momo_camon";
        var ipnUrl      = process.env.HOST+"/cart/order_create/momo_camon";
        var amount = props.tong_phi;
        var requestType = "captureWallet";
        var extraData = ""; 
        
                
        var rawSignature = "accessKey="+accessKey
                            +"&amount=" + amount
                            +"&extraData=" + extraData
                            +"&ipnUrl=" + ipnUrl
                            +"&orderId=" + orderId
                            +"&orderInfo=" + orderInfo
                            +"&partnerCode=" + partnerCode 
                            +"&redirectUrl=" + redirectUrl
                            +"&requestId=" + requestId
                            +"&requestType=" + requestType;
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)

        
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)

        const requestBody = JSON.stringify({
            partnerCode : partnerCode,
            accessKey : accessKey,
            requestId : requestId,
            amount : amount,
            orderId : orderId,
            orderInfo : orderInfo,
            redirectUrl : redirectUrl,
            ipnUrl : ipnUrl,
            extraData : extraData,
            requestType : requestType,
            signature : signature,
            lang: 'vi',
        });

        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }

        const req = https.request(options, res => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (body) => {
                // console.log('Body: ');
                // console.log(body);
                // console.log('payUrl: ');
                // console.log(JSON.parse(body).payUrl);
                resolve(body)

            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        })

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log("Sending....")
        req.write(requestBody);
        req.end();
    });
}
module.exports = {momoCall};

// router.get('/', async function(req, res, next) {
//     const result = await momoCall(req.query);
//     res.send(result)
// });

// router.get('/camon', async function(req, res, next) {
//     const resultCode = req.query.resultCode
    
//     if (resultCode == 0){
//         res.redirect(204, process.env.SUCCESS)
//     }
//     else
//         res.redirect(process.env.FAIL)
        
//     console.log("done")
// });
