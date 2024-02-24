<!-- markdownlint-disable MD033 -->

# NBSPlayer

BDS 中的 NBS 音乐播放器！在服务器中随时随地享受红石音乐吧！

## 介绍

### 特点

- 支持 单音符 / 轨道 / 音色 的音高、音量等设置，单音符的精细调音
- 支持超过两个八度限制的音符
- 支持自定义音色
  - 请将自定义音色的文件名称设置为 `playsound` 命令可以播放的声音 ID，例：`dig.stone.ogg`，支持资源包自定义的音色  
    ![例子](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/QQ%E5%9B%BE%E7%89%8720221030150141.png)
- 支持了播放列表，可以连续或随机播放，支持创建自己的播放列表

### 缺点

- 播放效果不好，会有小卡顿（对不上拍）（MC TPS 限制，可以使用 Trapdoor 等插件修改 TPS）
- 稍微动一下视角声道就会偏（`playsound` 局限）
- 不支持 左右声道偏离（懒，麻烦）
- 不支持 layer 独奏（懒）
- 不支持 loop（懒）

### 截图

#### 主界面

<details>
<summary>点击展开</summary>

![1](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/1.png)

</details>

#### 文件列表

<details>
<summary>点击展开</summary>

![2-1](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/2-1.png)  
![2-2](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/2-2.png)

</details>

#### 播放控制

<details>
<summary>点击展开</summary>

![3](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/3.png)

</details>

#### 创建歌单

<details>
<summary>点击展开</summary>

![4](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/4.png)

</details>

#### 歌单操作

<details>
<summary>点击展开</summary>

![5](https://raw.githubusercontent.com/lgc-LLDev/readme/main/NbsPlayer/5.png)

</details>

## 安装

### 使用 Lip

```bash
# 版本号可能更新不及时，最新版本号以 Release 页面为准，请手动替换
lip install github.com/lgc-LLDev/NBSPlayer@2.0.0
```

之后启动服务器，将 NBS 文件扔进 `./plugins/NBSPlayer/nbs` 文件夹中即可

## 联系我

QQ：3076823485  
吹水群：[1105946125](https://jq.qq.com/?_wv=1027&k=Z3n1MpEp)  
邮箱：<lgc2333@126.com>

## 鸣谢

### [OpenNBS/pynbs](https://github.com/OpenNBS/pynbs)

- [nbs-play](https://github.com/lgc2333/nbs-play) 的实现参考

## 赞助

感谢大家的赞助！你们的赞助将是我继续创作的动力！

- [爱发电](https://afdian.net/@lgc2333)
- <details>
    <summary>赞助二维码（点击展开）</summary>

  ![讨饭](https://raw.githubusercontent.com/lgc2333/ShigureBotMenu/master/src/imgs/sponsor.png)

  </details>

## 更新日志

### 2.0.0

- 完全重构项目
  - 换用了自己写的 [nbs-play](https://github.com/lgc2333/nbs-play) 库来解析与播放 NBS 文件，以及播放列表支持
  - 将插件播放音效的逻辑扔进了 `onTick` 事件监听里
  - UI 逻辑、指令逻辑等大改

<details>
<summary>v1 更新日志</summary>

### 1.0.1

- 播放性能优化（可能）
- 修复无法播放最后一个音符的 bug
- 更改自定义音色的使用方式

### 1.0.0

- 迁移到 nodejs 插件
- 更换 nbs 文件解析方式，弃用 `NbsConvertor`
- 歌曲进度显示方式更换为 boss 条
- 修复由于我对单音符 `pitch` 的错误理解导致的音符音高错误
- 修复玄学的命令方块内目标选择器问题（可能是我命令注册的问题）
- `nbsplay` 指令的有关小 bug
- 其他问题修复/特性调整（不要问，问就是我忘了）

</details>

<details>
<summary>v0 更新日志</summary>

### 0.2.0

- 换用向客户端发送数据包的方式播放音效
- NbsConvertor 的运行超时限制为 10s
- 加入歌曲列表为 0 时的提示，与页数小于 2 无法跳页的提示
- `nbsplayer` 命令加入可选参数 `filename`，可以直接指定播放的文件名
- 加入命令 `nbsplay` `nbsisplaying`

### 0.1.1

- 修复 nbs 文件名不能为特殊符号或中文的问题
- 修复无法播放最后一 tick 的音符的 bug
- 加入音符数量显示

</details>
