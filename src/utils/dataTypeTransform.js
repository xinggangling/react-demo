let code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); //索引表

const binToStr = (Bin) => {
  let result = "";
  for (let i = 0; i < Bin.length; i += 8) {
    result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2));
  }
  return result;
}

const stringToBin = (str) => {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i).toString(2);
    result += (new Array(9 - charCode.length).join("0") + charCode);
  }
  return result;
}

const base64ToBin = (str) => {
  let bitString = "";
  let tail = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] != "=") {
      let decode = code.indexOf(str[i]).toString(2);
      bitString += (new Array(7 - decode.length)).join("0") + decode;
    } else {
      tail++;
    }
  }
  return bitString.substr(0, bitString.length - tail * 2);
}

export const base642img = (data) => {
  let str = binToStr(base64ToBin(data));
  console.log('str: ', str)
  let imgWidth = str.match(/\$\$(\d+),(\d+)\$\$$/, "")[1];
  let imgHeight = str.match(/\$\$(\d+),(\d+)\$\$$/, "")[2]
  let imgData = base64ToBin(data).replace(stringToBin("$$" + imgWidth + "," + imgHeight + "$$"), "");
  
  let ImageDataArray = new Uint8ClampedArray(imgWidth * imgHeight * 4);
  for (let i = 0; i < ImageDataArray.length; i++) {
    ImageDataArray[i] = parseInt(imgData.substr(i * 8, 8), 2);
  }
  return new ImageData(ImageDataArray, imgWidth, imgHeight);
}
