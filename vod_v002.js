const RESOURCE_SITES = `
🎬豆瓣资源,https://dbzy.tv/api.php/provide/vod/
🎬茅台资源,https://caiji.maotaizy.cc/api.php/provide/vod/
🎬金鹰点播,https://jinyingzy.com/api.php/provide/vod/
🎬飘零资源,https://p2100.net/api.php/provide/vod/
🎬速博资源,https://subocaiji.com/api.php/provide/vod/
🎬索尼资源,https://suoniapi.com/api.php/provide/vod/
🎬閃電资源,https://sdzyapi.com/api.php/provide/vod/
🎬樱花资源,https://m3u8.apiyhzy.com/api.php/provide/vod/
🎬丫丫点播,https://cj.yayazy.net/api.php/provide/vod/
🎬魔都动漫,https://caiji.moduapi.cc/api.php/provide/vod/
🎬牛牛点播,https://api.niuniuzy.me/api.php/provide/vod/
🎬步步高资源,https://api.yparse.com/api/json/
🎬天涯海角,https://tyyszyapi.com/api.php/provide/vod/
🎬卧龙采集,https://collect.wolongzyw.com/api.php/provide/vod/
🎬非凡采集,https://cj.ffzyapi.com/api.php/provide/vod/
🎬最大点播,http://zuidazy.me/api.php/provide/vod/
🎬索尼闪电,https://xsd.sdzyapi.com/api.php/provide/vod/
🎬红牛资源3,https://www.hongniuzy3.com/api.php/provide/vod/
🎬旺旺API,https://api.wwzy.tv/api.php/provide/vod/
🎬暴风APP,https://app.bfzyapi.com/api.php/provide/vod/
🎬无尽CC,https://api.wujinapi.cc/api.php/provide/vod/
🎬无尽ME,https://api.wujinapi.me/api.php/provide/vod/
🎬无尽NET,https://api.wujinapi.net/api.php/provide/vod/
🎬卧龙CC,https://collect.wolongzy.cc/api.php/provide/vod/
🎬U酷资源88,https://api.ukuapi88.com/api.php/provide/vod/
`;

const CHINESE_NUM_MAP = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
};

const WidgetMetadata = {
  id: "vod_v002",
  title: "VOD Stream Config V002",
  icon: "https://assets.vvebo.vip/scripts/icon.png",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "Pre-configured VOD sources V002 (26-50)",
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
      value: RESOURCE_SITES
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

const isM3U8Url = (url) => url?.toLowerCase().includes('m3u8') || false;

function extractSeasonInfo(seriesName) {
  if (!seriesName) return { baseName: seriesName, seasonNumber: 1 };
  const chineseMatch = seriesName.match(/第([一二三四五六七八九十\d]+)[季部]/);
  if (chineseMatch) {
    const val = chineseMatch[1];
    const seasonNum = CHINESE_NUM_MAP[val] || parseInt(val) || 1;
    const baseName = seriesName.replace(/第[一二三四五六七八九十\d]+[季部]/, '').trim();
    return { baseName, seasonNumber: seasonNum };
  }
  const digitMatch = seriesName.match(/(.+?)(\d+)$/);
  if (digitMatch) {
    return { baseName: digitMatch[1].trim(), seasonNumber: parseInt(digitMatch[2]) || 1 };
  }
  return { baseName: seriesName.trim(), seasonNumber: 1 };
}

function extractPlayInfoForCache(item, siteTitle, type) {
  const { vod_name, vod_play_url, vod_play_from, vod_remarks = '' } = item;
  if (!vod_name || !vod_play_url) return [];

  const playSources = vod_play_url.replace(/#+$/, '').split('$$$');
  const sourceNames = (vod_play_from || '').split('$$$');
  
  return playSources.flatMap((playSource, i) => {
    const sourceName = sourceNames[i] || '默认源';
    const isTV = playSource.includes('#');
    const results = [];

    if (type === 'tv' && isTV) {
      const episodes = playSource.split('#').filter(Boolean);
      episodes.forEach(ep => {
        const [epName, url] = ep.split('$');
        if (url && isM3U8Url(url)) {
          const epMatch = epName.match(/第(\d+)集/);
          results.push({
            name: siteTitle,
            description: `${vod_name} - ${epName}${vod_remarks ? ' - ' + vod_remarks : ''} - [${sourceName}]`,
            url: url.trim(),
            _ep: epMatch ? parseInt(epMatch[1]) : null
          });
        }
      });
    } else if (type === 'movie' && !isTV) {
      const firstM3U8 = playSource.split('#').find(v => isM3U8Url(v.split('$')[1]));
      if (firstM3U8) {
        const [quality, url] = firstM3U8.split('$');
        const qualityText = quality.toLowerCase().includes('tc') ? '抢先版' : '正片';
        results.push({
          name: siteTitle,
          description: `${vod_name} - ${qualityText} - [${sourceName}]`,
          url: url.trim()
        });
      }
    }
    return results;
  });
}

function parseResourceSites(VodData) {
  const parseLine = (line) => {
    const [title, value] = line.split(',').map(s => s.trim());
    if (title && value?.startsWith('http')) {
      return { title, value: value.endsWith('/') ? value : value + '/' };
    }
    return null;
  };
  try {
    const trimmed = VodData?.trim() || "";
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      return JSON.parse(trimmed).map(s => ({ title: s.title || s.name, value: s.url || s.value })).filter(s => s.title && s.value);
    }
    return trimmed.split('\n').map(parseLine).filter(Boolean);
  } catch (e) {
    return RESOURCE_SITES.trim().split('\n').map(parseLine).filter(Boolean);
  }
}

async function loadResource(params) {
  const { seriesName, type = 'tv', season, episode, multiSource, VodData } = params;
  if (multiSource !== "enabled" || !seriesName) return [];

  const resourceSites = parseResourceSites(VodData);
  const { baseName, seasonNumber } = extractSeasonInfo(seriesName);
  const targetSeason = season ? parseInt(season) : seasonNumber;
  const targetEpisode = episode ? parseInt(episode) : null;

  const cacheKey = `vod_exact_cache_${baseName}_s${targetSeason}_${type}`;
  let allResources = [];
  
  try {
    const cached = Widget.storage.get(cacheKey);
    if (cached && Array.isArray(cached)) {
      console.log(`命中缓存: ${cacheKey}`);
      allResources = cached;
    }
  } catch (e) {}

  if (allResources.length === 0) {
    const fetchTasks = resourceSites.map(async (site) => {
      try {
        const response = await Widget.http.get(site.value, {
          params: { ac: "detail", wd: baseName.trim() },
          timeout: 10000 
        });
        const list = response?.data?.list;
        if (!Array.isArray(list)) return [];

        return list.flatMap(item => {
          const itemInfo = extractSeasonInfo(item.vod_name);
          
          if (itemInfo.baseName !== baseName || itemInfo.seasonNumber !== targetSeason) {
            return [];
          }
          
          return extractPlayInfoForCache(item, site.title, type);
        });
      } catch (error) {
        return [];
      }
    });

    const results = await Promise.all(fetchTasks);
    const merged = results.flat();

    const urlSet = new Set();
    allResources = merged.filter(res => {
      if (urlSet.has(res.url)) return false;
      urlSet.add(res.url);
      return true;
    });

    if (allResources.length > 0) {
      try { Widget.storage.set(cacheKey, allResources, 10800); } catch (e) {}
    }
  }

  if (type === 'tv' && targetEpisode !== null) {
    return allResources.filter(res => {
      if (res._ep !== undefined && res._ep !== null) {
        return res._ep === targetEpisode;
      }
      return res.description.includes(`第${targetEpisode}集`);
    });
  }

  return allResources;
}
