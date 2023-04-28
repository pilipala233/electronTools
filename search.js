var fs = require('fs');
var path = require('path');
//需要排除的文件格式
//var noStatistics = ['.pdf', '.PDF']
//const args = process.argv.slice(2)
//要遍历的文件夹所在的路径
//var filePath = path.resolve('./' + args[0]);
var resstr = ''
//输出的文件名
//var resfilename = 'yooooo.txt'



const find = (filePath,outpullFilePath,noStatistics,resfilename) => {
    console.log(filePath,outpullFilePath,noStatistics,resfilename);
    resstr = ''
    return new Promise((resolve, reject) => {
      //调用文件遍历方法
      fileDisplay(filePath,noStatistics);
  
      if (resstr.length) {
        if(outpullFilePath){
            // 创建一个可以写入的流，写入到文件 output.txt 中
            var writerStream = fs.createWriteStream(outpullFilePath+'/'+ resfilename+'.txt');
    
            // 使用 utf8 编码写入数据
            writerStream.write(resstr, 'UTF8');
    
            // 标记文件末尾
            writerStream.end();
    
            // 处理流事件 --> finish、error
            writerStream.on('finish', function () {
            //alert("写入完成。")
            console.log("写入完成。");
            resolve(resstr);
            });
    
            writerStream.on('error', function (err) {
            console.log("错误", err.stack);
            reject(0);
            });
        }else{
            resolve(resstr);
        }


      } else {
        console.log('执行完毕,没有匹配数据');
        resolve(0);
      }
    });
  }
  


// const find = (filePath,outpullFilePath,noStatistics,resfilename) => {
//     console.log(filePath,outpullFilePath,noStatistics,resfilename)
    
    
//     //调用文件遍历方法
//     fileDisplay(filePath,noStatistics);

//     if (resstr.length) {
//         //console.log(resstr)
//         // 创建一个可以写入的流，写入到文件 output.txt 中
//         var writerStream = fs.createWriteStream(outpullFilePath+'/'+ resfilename+'.txt');

//         // 使用 utf8 编码写入数据
//         writerStream.write(resstr, 'UTF8');

//         // 标记文件末尾
//         writerStream.end();

//         // 处理流事件 --> finish、error
//         writerStream.on('finish', function () {
//             //alert("写入完成。")
//             console.log("写入完成。");
//             return Promise.resolve(1)
//         });

//         writerStream.on('error', function (err) {
           
//             console.log("错误", err.stack);
//             return Promise.reject(0)
//         });

        
        
//         console.log("程序执行完毕");
//     } else {
//         return Promise.resolve(0)
//         console.log('执行完毕,没有匹配数据')
//     }
// }


/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath,noStatistics) {
    //根据文件路径读取文件，返回文件列表
    const files = fs.readdirSync(filePath)
    //遍历读取到的文件列表
    files.forEach(function (filename, index, arr) {

        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        const stats = fs.statSync(filedir);
        var isFile = stats.isFile(); //是文件

        var isDir = stats.isDirectory(); //是文件夹
        if (isFile) {
            //判断文件类型
            const extName = path.extname(filedir)
            
            if (!noStatistics.includes(extName.toLowerCase())) {

                resstr += filedir + '\n'


            }

            //是文件的情况下判断类型
        }
        if (isDir) {
            fileDisplay(filedir,noStatistics); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }

    });

}
module.exports = {
    find
}