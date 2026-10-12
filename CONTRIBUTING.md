# 贡献指南

感谢你想让这个项目更好。它本质是个人学习笔记站，但任何改进都欢迎。

## 提 Issue

- **Bug**：请说明 重现步骤 / 期望结果 / 实际结果 / 浏览器与系统
- **新功能**：先说清解决什么问题，再给方案（有草图更好）
- 提问前先搜一下现有 issue，避免重复

## 提 PR

1. Fork 仓库，从 `main` 切分支：`git checkout -b feat/your-change`
2. 本地跑通这两条再提：
   ```bash
   npm run build
   npm run check:links      # 不能有死链
   ```
3. 提交信息简明，建议带类型前缀：`feat:` `fix:` `docs:` `refactor:` `perf:`
4. PR 描述写清「改了什么 / 为什么 / 如何验证」，UI 相关请附截图

## 代码约定

- 组件放 `src/components/`，客户端脚本放 `src/scripts/`，页面放 `src/pages/`
- **样式优先复用 `src/styles/global.css` 里的共享类**（`.page-head`、`.view-bar`、`.chip`、`.empty-box` …），不要每个页面各造一套
- 皮肤 / 主题 / 雷达等控件是靠 `data-*` 属性选择器全局绑定的（`[data-skin-set]`、`[data-theme-toggle]`、`[data-radar]`）。新增同类控件请沿用这套，放在 DOM 任意位置都能工作，**不要重复实现逻辑**
- 状态类（如 `nav-editing`）要挂在组件自身的根元素上：Astro 会给 scoped 选择器的每一段都加 scope 哈希，挂到 `body` 上会永远匹配不到
- **不要提交 `package-lock.json`**：本仓库刻意不提交它，Cloudflare Pages 才会走 `npm install`（有 lock 会跑 `npm ci`，失同步即构建失败）

## 写文章

```bash
npm run new -- "文章标题" --category=Agent --slug=english-name
npm run og          # 有新文章时生成分享封面图
npm run release -- "新增文章：xxx"   # 一键发布
```

- 站内内链务必写**绝对路径** `/notes/<id>/`（相对路径会因目录层级多算一级而 404）
- frontmatter 字段见 [用户手册](./用户手册.md)

## 许可

提交 PR 即表示你同意：代码以 **MIT**、文章内容以 **CC BY-NC-SA 4.0** 授权发布。详见 [LICENSE](./LICENSE) 与 [CONTENT-LICENSE.md](./CONTENT-LICENSE.md)。
