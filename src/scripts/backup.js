// 数据备份：把本机 localStorage 里的个性化数据导出成 JSON，或从一个 JSON 恢复。
// 解决换设备 / 清缓存导致收藏、摘录、阅读足迹丢失的问题（站点零后端，数据只在本机）。

// 只备份这些键，导入时也只认这些键（避免把无关数据写进 localStorage）
const KEYS = [
  'favs',       // 收藏
  'likes',      // 点赞（注入能量）
  'clippings',  // 本地摘录
  'visited',    // 阅读足迹（最近浏览 / 系列已读进度）
  'hotkeys',    // 自定义快捷键
  'read-theme', // 阅读主题预设
  'read_size',
  'read_lh',
  'read_weight', // 正文字号 / 行距 / 字重
  'skin',
  'theme',
  'bg', // 皮肤 / 明暗 / 背景模式
  'palette',
  'palette_custom', // 配色
  'bg_force',
  'bg_click',
  'comments', // 动态交互开关
  'notes-stage', // 笔记舞台布局
];

// 值一律按「原始字符串」存取：有些键存的是 JSON（如 favs），有些是纯字符串（如 skin），
// 不做二次解析就不会在导入时把格式弄坏。
export function collectBackup() {
  const data = {};
  KEYS.forEach((k) => {
    try {
      const v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    } catch (e) {}
  });
  return { app: 'fight1-ai-notes', version: 1, exportedAt: new Date().toISOString(), data };
}

export function downloadBackup() {
  const payload = collectBackup();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fight1-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return Object.keys(payload.data).length;
}

export function applyBackup(obj) {
  if (!obj || typeof obj !== 'object') throw new Error('文件内容不是合法对象');
  const data = obj.data && typeof obj.data === 'object' ? obj.data : obj;
  let n = 0;
  Object.keys(data).forEach((k) => {
    if (!KEYS.includes(k)) return;
    try {
      localStorage.setItem(k, String(data[k]));
      n++;
    } catch (e) {}
  });
  if (!n) throw new Error('没有可识别的数据');
  return n;
}

export function readBackupFile(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        resolve(JSON.parse(String(fr.result)));
      } catch (e) {
        reject(new Error('不是合法的 JSON 文件'));
      }
    };
    fr.onerror = () => reject(new Error('文件读取失败'));
    fr.readAsText(file);
  });
}
