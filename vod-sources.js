WidgetMetadata = {
  id: "forward.vod-sources",
  title: "VOD源配置",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "提供多个VOD视频源的配置信息",
  author: "Forward",
  site: "https://github.com/rapier15sapper/ew",
  modules: [
    {
      id: "getSources",
      title: "获取VOD源列表",
      functionName: "getSources",
      params: [
        {
          name: "group",
          title: "分组",
          type: "enumeration",
          enumOptions: [
            {
              title: "全部",
              value: "all"
            },
            {
              title: "普通",
              value: "normal"
            }
          ],
          value: "all"
        },
        {
          name: "enabledOnly",
          title: "仅启用",
          type: "boolean",
          value: true
        }
      ]
    }
  ]
};

// VOD源数据 - 直接从test.json导入
const vodSources = [
  {
    "id": "feifan",
    "name": "非凡资源",
    "baseUrl": "http://ffzy5.tv/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 1
  },
  {
    "id": "wolong",
    "name": "卧龙资源",
    "baseUrl": "https://wolongzyw.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 2
  },
  {
    "id": "zuida",
    "name": "最大资源",
    "baseUrl": "https://api.zuidapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 3
  },
  {
    "id": "baiduyun",
    "name": "百度云资源",
    "baseUrl": "https://api.apibdzy.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 4
  },
  {
    "id": "baofeng",
    "name": "暴风资源",
    "baseUrl": "https://bfzyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 5
  },
  {
    "id": "jisu",
    "name": "极速资源",
    "baseUrl": "https://jszyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 6
  },
  {
    "id": "tianya",
    "name": "天涯资源",
    "baseUrl": "https://tyyszy.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 7
  },
  {
    "id": "wujin",
    "name": "无尽资源",
    "baseUrl": "https://api.wujinapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 8
  },
  {
    "id": "modu",
    "name": "魔都资源",
    "baseUrl": "https://www.mdzyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 9
  },
  {
    "id": "sanliuling",
    "name": "360资源",
    "baseUrl": "https://360zy.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 10
  },
  {
    "id": "dytt",
    "name": "电影天堂",
    "baseUrl": "http://caiji.dyttzyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 11
  },
  {
    "id": "ruyi",
    "name": "如意资源",
    "baseUrl": "https://cj.rycjapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 12
  },
  {
    "id": "wangwang",
    "name": "旺旺资源",
    "baseUrl": "https://wwzy.tv/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 13
  },
  {
    "id": "hongniu",
    "name": "红牛资源",
    "baseUrl": "https://www.hongniuzy2.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 14
  },
  {
    "id": "guangsu",
    "name": "光速资源",
    "baseUrl": "https://api.guangsuapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 15
  },
  {
    "id": "ikun",
    "name": "iKun资源",
    "baseUrl": "https://ikunzyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 16
  },
  {
    "id": "youku",
    "name": "优酷资源",
    "baseUrl": "https://api.ukuapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 17
  },
  {
    "id": "huya",
    "name": "虎牙资源",
    "baseUrl": "https://www.huyaapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 18
  },
  {
    "id": "xinlang",
    "name": "新浪资源",
    "baseUrl": "http://api.xinlangapi.com/xinlangapi.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 19
  },
  {
    "id": "lezi",
    "name": "乐子资源",
    "baseUrl": "https://cj.lziapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 20
  },
  {
    "id": "haihua",
    "name": "海豚资源",
    "baseUrl": "https://hhzyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 21
  },
  {
    "id": "jiangyu",
    "name": "鲸鱼资源",
    "baseUrl": "https://jyzyapi.com/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 22
  },
  {
    "id": "aidan",
    "name": "爱蛋资源",
    "baseUrl": "https://lovedan.net/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 23
  },
  {
    "id": "moduzy",
    "name": "魔都影视",
    "baseUrl": "https://www.moduzy.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 24
  },
  {
    "id": "feifanapi",
    "name": "非凡API",
    "baseUrl": "https://api.ffzyapi.com/api.php/provide/vod",
    "group": "normal",
    "enabled": true,
    "priority": 25
  }
];

// 获取VOD源列表的主函数
async function getSources(params) {
  const { group = "all", enabledOnly = true } = params || {};
  
  let filteredSources = vodSources;
  
  // 根据分组过滤
  if (group !== "all") {
    filteredSources = filteredSources.filter(source => source.group === group);
  }
  
  // 根据启用状态过滤
  if (enabledOnly) {
    filteredSources = filteredSources.filter(source => source.enabled === true);
  }
  
  // 按优先级排序
  filteredSources.sort((a, b) => a.priority - b.priority);
  
  return filteredSources;
}