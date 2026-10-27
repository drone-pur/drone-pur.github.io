# 如何手动更换 Examples 案例

下载并解压网页源码包。只需要编辑 **`cases.js`** 和 **`assets/`**，无需修改页面样式。

如果使用开发项目目录，对应位置是 `dist/cases.js` 和 `dist/assets/`。源码包已将 `dist/` 的内容放到根目录。

## 更换一个已有任务的例子

1. 将新图片放入 `assets/`，建议使用清晰的 JPG、PNG 或 WebP。文件名尽量使用英文、数字和短横线，例如 `my-counting.jpg`。
2. 用 VS Code 等文本编辑器打开 `cases.js`，搜索任务全称，例如 `Object Counting`。
3. 保留 `id`、`dimension` 和 `title`，只修改该对象里的 `images`、`question` 和 `answer`。
4. 保存文件。发布时同时更新 `cases.js` 和新增的图片文件；只改本地文件不会改变在线网页。

例如，将 Object Counting 的整个案例对象替换为：

```js
{
  "id": "oc",
  "dimension": "perception",
  "title": "Object Counting",
  "images": [
    { "src": "my-counting.jpg", "label": "RGB image" }
  ],
  "question": "How many white cars are there?",
  "answer": "12"
}
```

这里的答案 12 只是编辑示例，请换成你的实际标注。`src` 只写文件名，不要写 `assets/` 前缀。`label` 是图片下方的说明，可改成 `Image 1`、`Frame 1`、`RGB`、`Thermal infrared` 等。案例标题由 `title` 提供，所有任务选择按钮也使用同一个全称。

## 多图案例

只需在同一案例的 `images` 数组中填写多个图片对象，页面会自动排版。两张图片并排，三张及以上采用两列网格。例如：

```js
"images": [
  { "src": "my-rgb.jpg", "label": "RGB" },
  { "src": "my-thermal.jpg", "label": "Thermal infrared" }
]
```

`question` 和 `answer` 都是文本字符串。坐标答案也请保留引号，例如 `"[0.1, 0.2, 0.3, 0.4]"`。图片里的目标框、箭头或其他标记需要提前画在图片中；页面不会根据答案自动画框。

## 编辑时注意

- 相邻两个案例对象之间必须有英文逗号；保留文件开头的 `window.DRONE_PUR_CASES = [` 和末尾的 `];`。
- 文本中的英文双引号需要写成 `\"`，换行写成 `\n`。不要用中文引号替代代码引号。
- 图片文件名大小写必须与 `src` 完全一致。
- 各任务的 `dimension` 保持为 `perception`、`understanding` 或 `reasoning`。不要把案例移动到错误的能力维度。
- 最简单的方式是直接替换现有图片文件，保留原文件名，再修改问题和答案。
- 如要改变默认打开的案例，在 `app.js` 中修改 `let activeIndex = 7;`。索引从 0 开始，7 对应第八个案例。

## 查看和发布

本地预览可在源码包所在目录运行 `python -m http.server 8000`，再打开 `http://localhost:8000/`。如果没有本地 Python，也可在发布后查看。

发布到 GitHub Pages 时，将修改后的 `cases.js` 和新增或替换的 `assets/` 图片提交到网页仓库。等待部署完成后刷新页面。若仍显示旧图片，可强制刷新，或给新图片换一个文件名并同步更新 `src`。

当前在线预览由本项目单独部署；修改下载的源码包不会自动同步到该预览地址。
