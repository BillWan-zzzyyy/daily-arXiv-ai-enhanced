/**
 * User Personalization Config
 * 个性化配置：默认关注的关键词与作者
 *
 * 这里的默认值随仓库走，任何设备/浏览器首次打开页面都会生效。
 * 在 Settings 页面保存后，浏览器本地的设置优先于这里的默认值。
 */

const USER_CONFIG = {
    /**
     * 默认关注的关键词
     * 在论文标题和摘要中做小写子串匹配
     */
    defaultKeywords: [
        'autonomous driving',
        'driving',
        'vision language model',
        'vla',
        'vlm',
        'vision-language-action',
        'vision-language-model'
    ],

    /**
     * 默认关注的作者
     * 在论文作者字段中做小写子串匹配
     */
    defaultAuthors: []
};

/**
 * 读取偏好设置的通用函数
 * 从未保存过 -> 返回仓库默认值；保存过 -> 以本地设置为准（包括显式清空）
 * @param {string} storageKey localStorage 的键名
 * @param {string[]} defaultValue 仓库默认值
 * @returns {string[]}
 */
function getPreference(storageKey, defaultValue) {
    const saved = localStorage.getItem(storageKey);

    // 从未保存过，使用仓库默认值
    if (saved === null) {
        return [...defaultValue];
    }

    try {
        const parsed = JSON.parse(saved);
        // 用户主动清空也是一种选择，此时返回空数组而不是回退到默认值
        if (Array.isArray(parsed)) {
            return parsed;
        }
        console.error(`${storageKey} 不是数组，回退到默认值`);
    } catch (e) {
        console.error(`解析 ${storageKey} 失败:`, e);
    }

    return [...defaultValue];
}

// 获取关键词偏好
function getPreferredKeywords() {
    return getPreference('preferredKeywords', USER_CONFIG.defaultKeywords);
}

// 获取作者偏好
function getPreferredAuthors() {
    return getPreference('preferredAuthors', USER_CONFIG.defaultAuthors);
}
