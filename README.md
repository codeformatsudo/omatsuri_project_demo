# omatsuri_project

## Description
　　お祭りのサイト構築に汎用的に使えるようにしました。

## Demo
  https://codeformatsudo.github.io/omatsuri_project/

## Usage
### GitHub Pagesでサイトを公開する
* forkしたリポジトリのdocsのbaseフォルダをSettingsのGitHub PagesのSouceで指定します。


### 情報の掲載
* docsのbaseフォルダ内のdataフォルダにある各csvやtxtを編集します。
* 必要のないファイルでも削除しないでください。
* 各csvファイルの1行目の項目は削除せず、2行目以降で必要がない場合は空のセルにしてください。
* イベントスケジュール（event-1.csvとevent-2.csv）は項目がありません。必要ない場合はテキストをすべて削除してください。
* テンプレートの基本色は「赤」「ピンク」「黒」「黄色」です。info.csvの基本色項目にお好みの色を入力してください。
* Twitterのハッシュタグでツイートした内容を、左下の「お知らせボタン」からスライドインした部分に表示できます。info.txtにTwitterのハッシュタグ（#は入れない）を入れてください。

### コードの修正する場合
* 修正はresourceフォルダ内で作業してください。gulpでdocsに出力しています。
