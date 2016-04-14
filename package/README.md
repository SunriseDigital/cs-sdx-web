# package

## 概要

このディレクトリには外部のライブラリを内容は改変せずコピーしています。リポジトリに含めることによりサイト構築時のパッケージ復元の手間を軽減するためです。ライセンスに関しては各ライブラリのライセンスに従ってください。ディレクトリ構成およびファイル名を一部変更しています。

##　リスト

* [jQuery](jquery) - [公式](https://jquery.com/)
* [Bootstrap](bootstrap) - [公式](http://getbootstrap.com/)
* [fontawesome](fontawesome) - [公式](https://fortawesome.github.io/Font-Awesome/)
* [momentjs](momentjs) - [公式](http://momentjs.com/)
* [Bootstrap 3 Datepicker](bootstrap-datetimepicker) - [公式](http://eonasdan.github.io/bootstrap-datetimepicker/)

## 配置時の注意

`/ライブラリ名/バージョン/ファイル群`という階層で配置します。`ファイル群`はディレクトリで仕分けしてあってもOKです。

通常ファイルと圧縮ファイルは同じ階層において拡張子の直前に`min`を付与してください。

例：`foobar.js` => `foobar.min.js`
