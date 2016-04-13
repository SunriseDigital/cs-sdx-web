if(!global.Sdx){
  global.Sdx = {};
}

function loadScript(url){
  return new Promise((resolve) => {
    var scriptTag = document.createElement('script');
    scriptTag.async = 1;
    scriptTag.defer = 1;
    scriptTag.src = url;

    scriptTag.onload = () => {
      resolve();
    };

    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(scriptTag, head.firstChild);
  });
}

/**
 * javascriptの外部ファイルをasyncで読み込みます。
 * [['jquery.js'], ['a.js', 'b.js']]
 * 上記例では`jquery.js`を読み終わってから、`a.js`と`b.js`を並列に一気に読みます。
 * @param  array<array<string>> scripts
 * @return Promise
 */
global.Sdx.require = (scripts) => {
  //解決済みのpromiseを作る
  var promise = Promise.resolve();
  scripts.forEach((scriptGroup) => {
    var promises = [];
    scriptGroup.forEach((script) => {
      promises.push(promise.then(() => loadScript(script)));
    });
    //promiseを入れ替えて次のスクリプトに備える
    promise = Promise.all(promises);
  });

  return promise;
}
