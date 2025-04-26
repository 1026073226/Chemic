class FILE_TOOLS {
  constructor() {
    this.ROOT_PATH = "";
  }

  readDirectory(directoryPath) {
    return new Promise((resolve, reject) => {

      plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, (fs) => {
        this.ROOT_PATH = fs.root.toURL();

        fs.root.getDirectory(directoryPath, {
          create: true
        }, (dirEntry) => {
          const reader = dirEntry.createReader();
          reader.readEntries((entries) => {
            const filePromises = entries
            .filter((entry) => entry.isFile)
            .map((entry) => this.readFile(entry));

            Promise.all(filePromises)
            .then((filesContent) => {
              resolve(filesContent);
            })
            .catch((error) => {
              reject(`读取文件失败: ${error}`);
            });
          }, (error) => {
            reject(`读取目录失败: ${error.message}`);
          });
        }, (error) => {
          reject(`获取目录失败: ${error.message}`);
        });
      }, (error) => {
        reject(`请求文件系统失败: ${error.message}`);
      });
    });
  }

  delFile(path) {
    return new Promise((resolve, reject) => {
      // 请求公共文档目录的文件系统
      plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, (fs) => {
        // 获取指定路径的文件对象
        fs.root.getFile(path, {
          create: false
        }, (fileEntry) => {
          // 删除文件
          fileEntry.remove(
            () => {
              resolve("删除文件成功");
            },
            (e) => {
              reject("删除文件失败：" + e.message);
            }
          );
        }, (e) => {
          reject("获取文件路径失败：" + e.message);
        });
      }, (e) => {
        reject("请求文件系统失败：" + e.message);
      });
    });
  }

  readFile(entry) {
    return new Promise((resolve, reject) => {
      entry.file((file) => {
        const fileReader = new plus.io.FileReader();
        fileReader.readAsText(file, "utf-8");
        fileReader.onload = (e) => {
          const content = e.target.result;
          resolve( {
            name: entry.name,
            content: content
          });
        };
        fileReader.onerror = (e) => {
          reject(`读取文件 ${entry.name} 失败: ${e.message}`);
        };
      });
    });
  }
}