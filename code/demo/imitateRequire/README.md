# imitateRequire

实现自定义 require 函数，支持 `.js` `.json` 文件类型

```
function myRequire(filename) {
  // 1. 转换成绝对路径
  const mPath = Module._resolveFilename(filename)
  // 2. 缓存优先
  const cacheModule = Module._cache[mPath]
  if (cacheModule) return cacheModule.exports
  // 3. 创建空 module
  const module = new Module(mPath)
  // 4. 缓存 module
  Module._cache[mPath] = module
  // 5. 执行加载(编译执行)
  Module.load()
  // 6. 返回数据
  return module.exports
}
```