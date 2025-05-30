const http = require('http');
const url = require('url');
const fs = require('fs');
const path = './data/';

// 确保数据目录存在
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

// 初始化文件（如果不存在）
const initFile = (filename, defaultValue) => {
  const filePath = path + filename;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultValue.toString());
  }
};

// 初始化所有数据文件
initFile('h1.txt', '0');
initFile('h2.txt', '0');
initFile('m1.txt', '100');
initFile('m2.txt', '100');
initFile('e1.txt', '0');
initFile('e2.txt', '0');
initFile('var.txt', '{}');

// 从文件读取整数
const readInt = (filename) => {
  try {
    const content = fs.readFileSync(path + filename, 'utf8').trim();
    return content ? parseInt(content) : 0;
  } catch (e) {
    return 0;
  }
};

// 从文件读取浮点数 (添加缺失的函数)
const readFloat = (filename) => {
  try {
    const content = fs.readFileSync(path + filename, 'utf8').trim();
    return content ? parseFloat(content) : 0;
  } catch (e) {
    return 0;
  }
};

// 读取JSON文件
const readJSON = (filename) => {
  try {
    return JSON.parse(fs.readFileSync(path + filename, 'utf8'));
  } catch (e) {
    return {};
  }
};

// 保存数据到文件
const saveData = (data) => {
  try {
    for (const [key, value] of Object.entries(data)) {
      // 对于浮点数值保留小数
      if (typeof value === 'number') {
        fs.writeFileSync(path + key, value.toString());
      } else {
        fs.writeFileSync(path + key, value);
      }
    }
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.statusCode = 200;
  
  // 加载当前状态
  let state = {
    hp1: 0,
    hp2: 0,
    maxp1: readInt('m1.txt'),
    maxp2: readInt('m2.txt'),
    hp1f: readFloat('h1.txt'),
    hp2f: readFloat('h2.txt'),
    p1e: readInt('e1.txt'),
    p2e: readInt('e2.txt'),
    modVar: readJSON('var.txt')
  };
  
  // 应用hp1f和hp2f (作为浮点数)
  if (state.hp1f !== 0) state.hp1 = state.hp1f;
  if (state.hp2f !== 0) state.hp2 = state.hp2f;
  
  let responseData = null;
  
  // 处理不同请求参数
  if (query.next) {
    if (query.next === 'p1') state.p1e = parseInt(query.r) || 0;
    else if (query.next === 'p2') state.p2e = parseInt(query.r) || 0;
  }
  
  if (query.var) {
    state.modVar[query.var] = query.value;
  }
  
  if (query.key) {
    res.end(state.modVar[query.key] || '');
    saveDataAfterResponse(state);
    return;
  }
  
  if (query.test) {
    res.end(query.test);
    saveDataAfterResponse(state);
    return;
  }
  
  if (query.h1) {
    // 使用浮点数解析
    const h1 = parseFloat(query.h1) || 0;
    const h2 = parseFloat(query.h2) || 0;
    const p = query.p;
    // max值作为整数处理
    const max = parseInt(query.max) || (p === 'p1' ? state.maxp1 : state.maxp2);
    
    if (p === 'p1') {
      state.hp1 -= h1;
      state.hp2 += h2;
      state.maxp1 = max;
    } else {
      state.hp2 -= h1;
      state.hp1 += h2;
      state.maxp2 = max;
    }
    
    responseData = JSON.stringify({
      ht1: state.hp1,
      ht2: state.hp2,
      maxp1: state.maxp1,
      maxp2: state.maxp2,
      p1e: state.p1e,
      p2e: state.p2e,
      modVar: state.modVar
    });
  } 
  else if (query.msg) {
    responseData = JSON.stringify({
      ht1: state.hp1,
      ht2: state.hp2,
      maxp1: state.maxp1,
      maxp2: state.maxp2,
      p1e: state.p1e,
      p2e: state.p2e,
      modVar: state.modVar
    });
  }
  
  if (query.reset) {
    state = {
      hp1: 0,
      hp2: 0,
      maxp1: 100,
      maxp2: 100,
      p1e: 0,
      p2e: 0,
      modVar: {}
    };
  }
  
  // 准备保存的数据
  const savePayload = {
    'h1.txt': state.hp1,
    'h2.txt': state.hp2,
    'm1.txt': state.maxp1,
    'm2.txt': state.maxp2,
    'e1.txt': state.p1e,
    'e2.txt': state.p2e,
    'var.txt': JSON.stringify(state.modVar)
  };
  
  // 异步保存数据并响应
  saveData(savePayload);
  
  if (responseData !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.end(responseData);
  } else {
    res.end();
  }
});

// 处理需要立即响应但稍后保存的情况
function saveDataAfterResponse(state) {
  setTimeout(() => {
    const savePayload = {
      'h1.txt': state.hp1,
      'h2.txt': state.hp2,
      'm1.txt': state.maxp1,
      'm2.txt': state.maxp2,
      'e1.txt': state.p1e,
      'e2.txt': state.p2e,
      'var.txt': JSON.stringify(state.modVar)
    };
    saveData(savePayload);
  }, 100);
}

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
