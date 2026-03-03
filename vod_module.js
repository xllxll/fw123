var WidgetMetadata = {
  id: "vod_stream_config",
  title: "VOD Stream Config",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "Pre-configured VOD sources based on test.json",
  author: "Forward User",
  site: "https://github.com/xllxll/fw123",
  globalParams: [
    {
      name: "multiSource",
      title: "是否启用聚合搜索",
      type: "enumeration",
      enumOptions: [
        { title: "启用", value: "enabled" },
        { title: "禁用", value: "disabled" }
      ]
    },
    {
      name: "VodData",
      title: "JSON或CSV格式的源配置",
      type: "input",
      value: `非凡资源,http://ffzy5.tv/api.php/provide/vod/
卧龙资源,https://wolongzyw.com/api.php/provide/vod/
最大资源,https://api.zuidapi.com/api.php/provide/vod/
百度云资源,https://api.apibdzy.com/api.php/provide/vod/
暴风资源,https://bfzyapi.com/api.php/provide/vod/
极速资源,https://jszyapi.com/api.php/provide/vod/
天涯资源,https://tyyszy.com/api.php/provide/vod/
无尽资源,https://api.wujinapi.com/api.php/provide/vod/
魔都资源,https://www.mdzyapi.com/api.php/provide/vod/
360资源,https://360zy.com/api.php/provide/vod/
电影天堂,http://caiji.dyttzyapi.com/api.php/provide/vod/
如意资源,https://cj.rycjapi.com/api.php/provide/vod/
旺旺资源,https://wwzy.tv/api.php/provide/vod/
红牛资源,https://www.hongniuzy2.com/api.php/provide/vod/
光速资源,https://api.guangsuapi.com/api.php/provide/vod/
iKun资源,https://ikunzyapi.com/api.php/provide/vod/
优酷资源,https://api.ukuapi.com/api.php/provide/vod/
虎牙资源,https://www.huyaapi.com/api.php/provide/vod/
新浪资源,http://api.xinlangapi.com/xinlangapi.php/provide/vod/
乐子资源,https://cj.lziapi.com/api.php/provide/vod/
海豚资源,https://hhzyapi.com/api.php/provide/vod/
鲸鱼资源,https://jyzyapi.com/provide/vod/
爱蛋资源,https://lovedan.net/api.php/provide/vod/
魔都影视,https://www.moduzy.com/api.php/provide/vod/
非凡API,https://api.ffzyapi.com/api.php/provide/vod/`
    }
  ],
  modules: [
    {
      id: "loadResource",
      title: "加载资源",
      functionName: "loadResource",
      type: "stream", 
      params: [],
    }
  ],
};

async function loadResource() {
    // This is a placeholder since the main functionality is provided via globalParams configuration
    return { items: [] };
}
