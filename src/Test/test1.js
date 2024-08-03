let str = "I have an apple and another 身份证(2).jpg";
let newStr = str.replace(/\(\d+\)/g, "orange");
console.log(newStr); // 输出: "I have an orange and another orange."
