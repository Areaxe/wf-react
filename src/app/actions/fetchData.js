import polyfill from 'babel-polyfill'
function parseParams(data) {
  let params = '';
  for (let key in data) {
    params += key + '=' + data[key] + '&'
  }
  return params.substring(0, params.length - 1)
}

export function fetchData() {
  let options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0],
    opt = {
      url: options.url || '',
      data: options.data || 't=' + new Date().getTime(),
      type: options.type || 'get',
      dataType: options.dataType || 'json',
      cache: options.cache || false,
      async: options.async || true,
      context: options.context || document.body,
      beforeSend: options.beforeSend || undefined,
    };
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    if (typeof opt.beforeSend === 'function') {
      opt.beforeSend();
    }
    req.open(opt.type, opt.url, opt.async);
    if (options.token && options.token !== '') {
      req.setRequestHeader("x-authorization-token", options.token);
    }
    if (opt.type.toUpperCase() === 'POST') {
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    if (opt.type.toUpperCase() === 'PUT') {
      req.setRequestHeader("Content-type", "application/json");
    }
    req.setRequestHeader("x-app-platform", "web");

    req.onload = function () {
      if (req.status === 200 && req.readyState === 4) {
        let responseText = JSON.parse(req.responseText)
        if (req.responseText) {
          if (responseText.result.code === 500) {
            alert("服务器无响应！")
            return
          } else {
            let data = req.responseText;
            if (opt.dataType === 'json') {
              data = JSON.parse(data);
            }
            resolve(data);
          }
        }
      } else {
        reject(new Error(req.statusText || 'You can\'t do this.'));
      }
    };
    req.onerror = function () {
      alert(new Error(req.statusText || 'Server is down.'))
      reject(new Error(req.statusText || 'Server is down.'));
    };
    req.timeout = 15000
    req.ontimeout = function () {
      if (!req.responseText) {
        alert('网速好像不给力哦，稍候再试？')
        window.history.back()
      }
    }
    if (opt.type.toUpperCase() === 'POST') {
      if (opt.data) {
        let params = parseParams(opt.data)
        req.send(params);
      } else {
        req.send();
      }
    } else if (opt.type.toUpperCase() === 'PUT') {
      req.send(JSON.stringify(opt.data));
    } else {
      req.send();
    }
  });
}