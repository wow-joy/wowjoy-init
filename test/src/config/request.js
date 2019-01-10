import "babel-polyfill";
import "fetch-detector";
import "fetch-ie8";
require("es6-promise").polyfill();
/**
 *  $fetch
 *  @property [base, get, post, delete, put]
 *  @param url <String> // 路径
 *  @param options  // 请求体(body)
 *  @param options.params  // 请求体(params)
 *  @param noCache @default true  // 不进行请求存储拦截
 */
const $fetch = {
  base: (url, options, noCache = true) => {
    const { params } = options;
    if (!url) {
      throw new Error("url is empty, 请求路径未设置");
    }
    if (params) {
      const str = Object.entries(params)
        .map(ele => ele.join("="))
        .join("&");
      if (url.includes("?")) {
        url += `&${str}`;
      } else {
        url += `?${str}`;
      }
      Reflect.deleteProperty(options, "params");
    }
    if (!noCache) {
      const cachedData = readCache(url, options);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
    }

    if (window._csrf) {
      options.headers = {
        ...options.headers,
        [window._csrf._csrfname]: window._csrf._csrftoken,
        "X-XSRF-TOKEN": window._csrf._csrftoken,
        _csrf: window._csrf._csrftoken
      };
    }

    return fetch(url, options)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }

        throw new Error(res.status);
      })
      .then(res => res.json())
      .then(res => {
        const result = res || {};
        !noCache && cacheFetch(url, options, result);
        return result;
      });
  },

  get(url, options, noCache = true) {
    return this.base(
      url,
      {
        credentials: "same-origin",
        ...options,
        method: "get"
      },
      noCache
    );
  },
  post(url, options) {
    return this.base(url, {
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "same-origin",
      ...options,
      method: "post"
    });
  },
  put(url, options) {
    return this.base(url, {
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "same-origin",
      ...options,
      method: "put"
    });
  },
  delete(url, options) {
    return this.base(url, {
      credentials: "same-origin",
      ...options,
      method: "delete"
    });
  }
};
function hashStr(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}
function readCache(url, options, res) {
  return JSON.parse(
    sessionStorage.getItem(hashStr(url + JSON.stringify(options)))
  );
}
function cacheFetch(url, options, res) {
  sessionStorage.setItem(
    hashStr(url + JSON.stringify(options)),
    JSON.stringify(res)
  );
}

/**
 *  api_config
 */
const apis = {
  test: "/test"
};

export { $fetch, apis };
