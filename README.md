# Forward VOD 源配置模块

这是一个将 VOD 视频源配置转换为 Forward 播放器模块的项目。基于 `test.json` 文件中的 25 个 VOD 源数据，创建了完整的 Forward 模块文件。

## 文件结构

```
Forward/
├── test.json                    # 原始 VOD 源数据文件
├── vod-sources.js              # ForwardWidget JavaScript 模块
├── vod-sources.fwd             # Forward 模块配置文件
└── README.md                   # 项目说明文档
```

## 模块功能

### 1. VOD 源配置模块 (`forward.vod-sources`)
- **ID**: `forward.vod-sources`
- **名称**: VOD源配置
- **版本**: 1.0.0
- **描述**: 提供多个 VOD 视频源的配置信息

### 2. 功能特性
- **参数化查询**: 支持按分组和启用状态过滤
  - 分组: "全部" 或 "普通"
  - 仅启用: 布尔开关
- **智能排序**: 按优先级 (`priority`) 字段自动排序
- **数据完整**: 保持原始所有字段 (`id`, `name`, `baseUrl`, `group`, `enabled`, `priority`)

### 3. 包含的 VOD 源
模块整合了 `test.json` 中的所有 25 个 VOD 源：

1. **非凡资源** (`feifan`) - `http://ffzy5.tv/api.php/provide/vod`
2. **卧龙资源** (`wolong`) - `https://wolongzyw.com/api.php/provide/vod`
3. **最大资源** (`zuida`) - `https://api.zuidapi.com/api.php/provide/vod`
4. **百度云资源** (`baiduyun`) - `https://api.apibdzy.com/api.php/provide/vod`
5. **暴风资源** (`baofeng`) - `https://bfzyapi.com/api.php/provide/vod`
6. **极速资源** (`jisu`) - `https://jszyapi.com/api.php/provide/vod`
7. **天涯资源** (`tianya`) - `https://tyyszy.com/api.php/provide/vod`
8. **无尽资源** (`wujin`) - `https://api.wujinapi.com/api.php/provide/vod`
9. **魔都资源** (`modu`) - `https://www.mdzyapi.com/api.php/provide/vod`
10. **360资源** (`sanliuling`) - `https://360zy.com/api.php/provide/vod`
11. **电影天堂** (`dytt`) - `http://caiji.dyttzyapi.com/api.php/provide/vod`
12. **如意资源** (`ruyi`) - `https://cj.rycjapi.com/api.php/provide/vod`
13. **旺旺资源** (`wangwang`) - `https://wwzy.tv/api.php/provide/vod`
14. **红牛资源** (`hongniu`) - `https://www.hongniuzy2.com/api.php/provide/vod`
15. **光速资源** (`guangsu`) - `https://api.guangsuapi.com/api.php/provide/vod`
16. **iKun资源** (`ikun`) - `https://ikunzyapi.com/api.php/provide/vod`
17. **优酷资源** (`youku`) - `https://api.ukuapi.com/api.php/provide/vod`
18. **虎牙资源** (`huya`) - `https://www.huyaapi.com/api.php/provide/vod`
19. **新浪资源** (`xinlang`) - `http://api.xinlangapi.com/xinlangapi.php/provide/vod`
20. **乐子资源** (`lezi`) - `https://cj.lziapi.com/api.php/provide/vod`
21. **海豚资源** (`haihua`) - `https://hhzyapi.com/api.php/provide/vod`
22. **鲸鱼资源** (`jiangyu`) - `https://jyzyapi.com/provide/vod`
23. **爱蛋资源** (`aidan`) - `https://lovedan.net/api.php/provide/vod`
24. **魔都影视** (`moduzy`) - `https://www.moduzy.com/api.php/provide/vod`
25. **非凡API** (`feifanapi`) - `https://api.ffzyapi.com/api.php/provide/vod`

## 使用方法

### 导入到 Forward 播放器

#### 方法一：本地文件导入（推荐）
1. 将 `vod-sources.fwd` 和 `vod-sources.js` 两个文件传输到 iOS/iPadOS 设备
2. 在 Forward 应用中，进入「首页配置」模式
3. 选择「导入 .fwd 文件」
4. 从文件管理器选择 `vod-sources.fwd` 文件
5. Forward 会自动识别并加载模块

#### 方法二：外部链接导入
1. 将 `vod-sources.js` 上传到可公开访问的服务器
2. 修改 `vod-sources.fwd` 中的 `url` 字段为完整 URL
3. 在 Forward「设置-模块」中输入 `.fwd` 文件的 URL

### 模块配置
导入成功后：
1. 在首页添加「VOD源配置」模块
2. 模块提供参数配置界面：
   - **分组**: 可选择"全部"或"普通"分组
   - **仅启用**: 开关控制是否只显示启用的源
3. 模块会显示过滤和排序后的 VOD 源列表

## 开发说明

### 模块架构
1. **数据层**: `vodSources` 数组直接包含 test.json 的完整数据
2. **业务逻辑层**: `getSources` 函数提供过滤和排序逻辑
3. **接口层**: `WidgetMetadata` 定义模块元数据和参数接口
4. **配置层**: `.fwd` 文件提供模块配置和引用信息

### 技术验证
- ✅ JavaScript 语法验证: `node -c vod-sources.js`
- ✅ JSON 格式验证: `vod-sources.fwd` 符合 JSON 规范
- ✅ Forward 模块规范: 遵循 ForwardWidget 的 `WidgetMetadata` 标准

### 扩展性
- **易于更新**: 如需更新 VOD 源列表，只需修改 `vodSources` 数组
- **参数可扩展**: 当前支持分组和启用状态过滤，可轻松添加更多过滤条件
- **多模块支持**: 可基于同一数据源创建不同展示模板的模块

## Git 仓库管理

### 初始化仓库
```bash
git init
git add .
git commit -m "Initial commit: Forward VOD 源配置模块"
```

### 推送到 GitHub
```bash
# 添加远程仓库
git remote add origin https://github.com/用户名/仓库名.git

# 推送到主分支
git branch -M main
git push -u origin main
```

## 许可证
本项目基于原始 `test.json` 数据创建，遵循原始数据的许可证条款。

## 相关链接
- [Forward 官方文档](https://forward-2.gitbook.io/forward)
- [ForwardWidgets GitHub 仓库](https://github.com/InchStudio/ForwardWidgets)
- [原始 test.json 来源](https://raw.githubusercontent.com/rapier15sapper/ew/refs/heads/main/test.json)

---

**创建日期**: 2026年3月3日  
**最后更新**: 2026年3月3日  
**版本**: 1.0.0