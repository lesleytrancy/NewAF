#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PWCLI="${PWCLI:-$HOME/.codex/skills/playwright/scripts/playwright_cli.sh}"
"$PWCLI" open "${1:-http://localhost:5173}"
"$PWCLI" run-code 'async (page) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole("button", {name:"发布动态",exact:true}).click();
  await page.getByRole("textbox", {name:"动态标题"}).fill("富文本回归验证");
  const body = page.locator(".toastui-editor-ww-container [contenteditable=true]");
  await body.fill("保留格式");
  await body.press("ControlOrMeta+a");
  await page.getByRole("button", {name:"加粗",exact:true}).click();
  await page.getByRole("button", {name:"斜体字",exact:true}).click();
  for(let i=0;i<3;i++) {
    await page.getByRole("button", {name:"MD",exact:true}).click();
    if ((await page.getByRole("dialog").boundingBox()).height !== 1000) throw new Error("MD must be fullscreen");
    await page.getByRole("button", {name:"文本",exact:true}).click();
  }
  if (await body.innerText() !== "保留格式" || !await body.locator("strong em").count()) throw new Error("Rich formatting lost");
  await body.click();
  await body.press("ControlOrMeta+End");
  await body.press("Enter");
  await page.keyboard.type("附加内容");
  await page.getByRole("button", {name:"☺",exact:true}).click();
  await page.getByRole("button", {name:"🎉",exact:true}).click();
  await page.getByRole("button", {name:"⊕",exact:true}).click();
  await page.getByRole("button", {name:"插入表格",exact:true}).click();
  await page.getByRole("button", {name:"插入图片",exact:true}).click();
  await page.locator(".toastui-editor-popup input[type=file]").setInputFiles("docs/journeys/textedit.png");
  await page.getByRole("button", {name:"确认",exact:true}).click();
  await body.locator("img[src]").waitFor();
  await page.getByRole("button", {name:"保存草稿",exact:true}).click();
  await page.getByRole("button", {name:"发布动态",exact:true}).click();
  await page.getByRole("dialog").getByRole("button", {name:"发布动态",exact:true}).click();
  await page.locator(".headline-open").filter({hasText:"富文本回归验证"}).click();
  const article = page.locator(".article-detail-main");
  if (!await article.locator("strong em, em strong").count() || !await article.locator("table").count() || !await article.locator("img").count() || !(await article.innerText()).includes("🎉")) throw new Error("Published formatting missing: " + JSON.stringify({text:await article.innerText(), bold:await article.locator("strong").count(), italic:await article.locator("em").count(), table:await article.locator("table").count(), image:await article.locator("img").count()}));
  await page.getByRole("button", {name:"返回 Feed"}).click();
  await page.getByRole("button", {name:"发布动态",exact:true}).click();
  await page.setViewportSize({width:390,height:844});
  if (await page.getByRole("dialog").evaluate(node => node.scrollWidth > node.clientWidth)) throw new Error("Mobile overflow");
  await page.getByRole("button", {name:"关闭编辑器",exact:true}).click();
  await page.getByRole("button", {name:"studio",exact:true}).click();
  await page.getByRole("button", {name:"AgenticFeed",exact:true}).click();
  if (errors.length) throw new Error(errors.join("; "));
}'
