# package

## 概要

このディレクトリには外部のライブラリを内容は改変せずコピーしています。リポジトリに含めることによりサイト構築時のパッケージ復元の手間を軽減するためです。ライセンスに関しては各ライブラリのライセンスに従ってください。ディレクトリ構成およびファイル名を一部変更しています。

##　リスト


* [Bootstrap](bootstrap) - [公式](http://getbootstrap.com/)
* [fontawesome](fontawesome) - [公式](https://fortawesome.github.io/Font-Awesome/)
* [jQuery](jquery) - [公式](https://jquery.com/)
* [jQueryColorBox](jquery-colorbox) - [公式](http://www.jacklmoore.com/colorbox/)
* [jQueryFileUpload](jquery-file-upload) - [公式](https://blueimp.github.io/jQuery-File-Upload/)
* [jQueryUI](jquery-ui) - [公式](https://jqueryui.com)
* [momentjs](momentjs) - [公式](http://momentjs.com/)


## 配置時の注意

`/ライブラリ名/バージョン/ファイル群`という階層で配置します。`ファイル群`はディレクトリで仕分けしてあってもOKです。

通常ファイルと圧縮ファイルは同じ階層において拡張子の直前に`min`を付与してください。

例：`foobar.js` => `foobar.min.js`
