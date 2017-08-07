# Carousel

## 特徴

* 階層を持ったカルーセルを構築できる。
* 階層は何段階でもOK。
* 階層は統一されてなくてもOK。1段階とn段階のパネルがごちゃ混ぜでもOK。
* アニメーションのON/OFFが可能。
* HTMLはサーバーサイドで複数回foreachを回さなくていいような構造でOK。

## 使い方

* [carousel/app.min.css](../../carousel/app.min.css)を読み込む。
* [carousel/app.min.js](../../carousel/app.min.js)を読み込む。
* HTMLの構造は[sample.html](./sample.html)を参考にしてください。`sdx-`接頭辞のついた下記の4つのクラスは必須です。
  * `sdx-carousel`を一番外側のラッパーにつけます。
  * `sdx-carousel-panel`が一つのコンテンツを表します。
  * `sdx-carousel-btn`は切り替えボタンです。ボタンは親パネルの`sdx-carousel-btnWrapper`に移動されますので注意してください。
* ラッパー及び各パネルは[高さ](./sample.html#L28-L47)を指定する必要があります。
* 現在表示中のパネル・ボタンには`sdx-carousel-current`のクラスが付与されます。
