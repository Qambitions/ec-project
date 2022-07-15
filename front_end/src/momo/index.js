import crypto from 'crypto';
import https from 'https';

export function momoCall(props){
    var partnerCode = "MOMOXQEO20220611";
    var accessKey = "AOjvfOzkjYrsczCz";
    var secretkey = "8Zz2FMDm7Be2tOVf2DFhwR9LlVvv3Doj";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var redirectUrl = "http://localhost:5000/camon";
    var ipnUrl      = "http://localhost:5000/camon";
    var amount = "100000";
    var requestType = "captureWallet";
    var extraData = ""; 
    var items =[{
                "id": "204782",  
                "name": "YOMOST Dau Tay 170ml",  
                "description": "YOMOST Sua Chua Uong Dau Tay 170ml/1 Hop",
                "category": "beverage",
                "manufacturer":"Vinamilk",
                "price": 11000,              
                "quantity": 3,
                "imageUrl":"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655547531/Huimitu-Logo-Final_zakn2y.png",
                "unit":"hộp",
                "price": 33000,
                "taxAmount":"200"
            },
            {
                "id": "21334",  
                "name": "YOMOST Dau Tay 170ml",  
                "description": "YOMOST Sua Chua Uong Dau Tay 170ml/1 Hop",
                "category": "beverage",
                "manufacturer":"Vinamilk",
                "price": 11000,              
                "quantity": 3,
                "imageUrl":"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655547531/Huimitu-Logo-Final_zakn2y.png",
                "unit":"hộp",
                "price": 33000,
                "taxAmount":"200"
            }]
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
        // items: items,
        lang: 'vi'
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
            console.log('Body: ');
            console.log(body);
            console.log('payUrl: ');
            console.log(JSON.parse(body).payUrl);
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

    console.log(requestBody)
}
