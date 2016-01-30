# flux-utils-sample
Flux Utilsを使った実装サンプル（かなり簡易版）

できる限りシンプルな構成でのFlux実装


## デモ
フォームに入力したテキストを表示させるだけのもの。

http://jsrun.it/maechabin/WiIU

## サンプルソース
- [bundle.js](https://github.com/maechabin/flux-utils-sample/blob/master/dist/bundle.js)
- [index.html](https://github.com/maechabin/flux-utils-sample/blob/master/index.html)

## サンプルの確認

### 1. サンプルのダウンロード
~~~
$ git clone git@github.com:maechabin/flux-utils-sample.git flux-utils-sample
~~~

### 2. サンプルをcloneしたディレクトリに移動して、必要なパッケージのインストール
~~~
$ cd flux-utils-sample
$ npm install
~~~

### 3. サンプルを開く
~~~
$ open ./index.html
~~~

## サンプルの修正

### 1. 「.src/app.js」を修正したら、以下のコマンドを実行
~~~
$ browserify ./src/app.js -o ./dist/bunde.js
~~~

※browserifyがシステムにインストールされていない場合は、以下コマンドでインストール
~~~
$ npm install -g browserify
~~~

### 2. サンプルを開く
~~~
$ open ./index.html
~~~
