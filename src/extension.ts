import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('扩展 "vscode-web-viewer" 已激活');

  let disposable = vscode.commands.registerCommand(
    "vscode-web-viewer.previewWebPage",
    async () => {
      const url = await vscode.window.showInputBox({
        prompt: "请输入要预览的网页 URL",
        placeHolder: "https://example.com",
      });

      if (url) {
        const panel = vscode.window.createWebviewPanel(
          "webPreview",
          "网页预览: " + url,
          vscode.ViewColumn.One,
          {
            enableScripts: true,
          }
        );

        panel.webview.html = getWebviewContent(url);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(url: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>网页预览</title>
            <style>
                body, html, iframe {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>
        </body>
        </html>
    `;
}

export function deactivate() {}
