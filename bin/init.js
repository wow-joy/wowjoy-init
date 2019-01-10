#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const repl = require("repl");

let sourcePath = path.resolve(process.argv[1], "../../sourse");
let processPath = process.cwd();
let replaceObj = {};

const replList = [
  { key: "projectName", text: "请输入项目名称(英文)" },
  { key: "projectType", text: "请输入项目类型[pc(默认为pc) 或 m(暂未实现)]" }
];
const settingList = {
  projectName: "",
  projectType: "pc"
};

const getFromRepl = enter => {
  const replObj = replList[0];
  settingList[replObj.key] = enter.replace(/\n/g, "");
  replList.shift();
  if (replList.length) {
    ask();
  } else {
    start(sourcePath);
  }
};
const ask = () => {
  const replObj = replList[0];
  console.log(replObj.text);
};
ask();
const r = repl.start({
  prompt: "> ",
  eval: getFromRepl,
  write: val => val.trim()
});
function start(sourcePath) {
  const startTime = new Date();
  copyRecursive(sourcePath, processPath)
    .then(() => {
      const endTime = new Date();
      console.log(
        "over useTime: ",
        ((endTime - startTime) / 1000).toFixed(2),
        "s"
      );
      process.exit();
    })
    .catch(err => {
      console.log("copyRecursive ERROR", err);
    });
}

function mkdir(dst) {
  return new Promise(res => {
    fs.access(dst, function() {
      fs.mkdirSync(dst);
      res();
    });
  }).catch(err => {
    console.error("mkdir ", err);
  });
}
function isDir(path) {
  return new Promise(res =>
    fs.stat(path, (err, st) => {
      if (err) {
        throw err;
      }
      if (st.isFile()) {
        res(false);
      } else if (st.isDirectory()) {
        res(true);
      }
    })
  ).catch(err => {
    console.error("isDir ", err);
  });
}

function readdir(src) {
  return new Promise(res =>
    fs.readdir(src, function(err, paths) {
      if (err) throw err;
      res(paths);
    })
  ).catch(err => {
    console.error("readdir ", err);
  });
}
function copyRecursive(sourcePath, processPath) {
  return new Promise(async res => {
    const paths = await readdir(sourcePath);
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      var source = sourcePath + "/" + path;
      var target = processPath + "/" + path;
      var isdir = await isDir(source);
      if (isdir) {
        await mkdir(target);
        await copyRecursive(source, target);
      } else {
        await copyFile(source, target);
      }
    }
    res();
  });
}

function copyFile(sourcePath, target) {
  new Promise(res => {
    if (/(package\.json|readme\.md)/i.test(sourcePath)) {
      fs.readFile(sourcePath, "utf8", (err, data) => {
        if (err) throw err;
        data = data.replace(/projectName/g, settingList.projectName);
        writeMyData(data);
      });
    } else if (/ignore\.bak/.test(sourcePath)) {
      fs.readFile(sourcePath, (err, data) => {
        if (err) throw err;
        writeMyData(data, target.replace(/ignore\.bak/, ".gitignore"));
      });
    } else {
      fs.readFile(sourcePath, (err, data) => {
        if (err) throw err;
        writeMyData(data);
      });
    }

    function writeMyData(data, path) {
      if (path) console.log("path,", path);
      fs.writeFile(path || target, data, { flag: "w+" }, errs => {
        if (errs) {
          throw errs;
        }
        res();
      });
    }
  }).catch(err => {
    console.error("copyFile ", err);
  });
}
