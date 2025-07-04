---
sidebar_position: 15
---

# 故障排除

> 发现 Claude Code 安装和使用中常见问题的解决方案。

## 常见安装问题

### Linux 权限问题

使用 npm 安装 Claude Code 时，如果您的 npm 全局前缀不可用户写入（例如 `/usr` 或 `/usr/local`），您可能会遇到权限错误。

#### 推荐解决方案：创建用户可写的 npm 前缀

最安全的方法是配置 npm 使用您主文件夹中的目录：

```bash
# 首先，保存您现有全局包的列表以供以后迁移
npm list -g --depth=0 > ~/npm-global-packages.txt

# 为您的全局包创建一个目录
mkdir -p ~/.npm-global

# 配置 npm 使用新的目录路径
npm config set prefix ~/.npm-global

# 注意：将 ~/.bashrc 替换为 ~/.zshrc、~/.profile 或适合您 shell 的其他文件
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

# 应用新的 PATH 设置
source ~/.bashrc

# 现在在新位置重新安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 可选：在新位置重新安装您以前的全局包
# 查看 ~/npm-global-packages.txt 并安装您想保留的包
```

推荐此解决方案，因为它：

*   避免修改系统目录权限
*   为您的全局 npm 包创建一个干净、专用的位置
*   遵循安全最佳实践

#### 系统恢复：如果您运行了更改系统文件所有权和权限或类似命令

如果您已经运行了更改系统目录权限的命令（例如 `sudo chown -R $USER:$(id -gn) /usr && sudo chmod -R u+w /usr`）并且您的系统现在已损坏（例如，如果您看到 `sudo: /usr/bin/sudo must be owned by uid 0 and have the setuid bit set`），您需要执行恢复步骤。

##### Ubuntu/Debian 恢复方法：

1.  重新启动时，按住 **SHIFT** 键以访问 GRUB 菜单

2.  选择“Ubuntu/Debian 的高级选项”

3.  选择恢复模式选项

4.  选择“进入 root shell 提示符”

5.  将文件系统重新挂载为可写：
    ```bash
    mount -o remount,rw /
    ```

6.  修复权限：

    ```bash
    # 恢复 root 所有权
    chown -R root:root /usr
    chmod -R 755 /usr

    # 确保 /usr/local 由您的用户拥有以用于 npm 包
    chown -R YOUR_USERNAME:YOUR_USERNAME /usr/local

    # 为关键二进制文件设置 setuid 位
    chmod u+s /usr/bin/sudo
    chmod 4755 /usr/bin/sudo
    chmod u+s /usr/bin/su
    chmod u+s /usr/bin/passwd
    chmod u+s /usr/bin/newgrp
    chmod u+s /usr/bin/gpasswd
    chmod u+s /usr/bin/chsh
    chmod u+s /usr/bin/chfn

    # 修复 sudo 配置
    chown root:root /usr/libexec/sudo/sudoers.so
    chmod 4755 /usr/libexec/sudo/sudoers.so
    chown root:root /etc/sudo.conf
    chmod 644 /etc/sudo.conf
    ```

7.  重新安装受影响的包（可选但推荐）：

    ```bash
    # 保存已安装包的列表
    dpkg --get-selections > /tmp/installed_packages.txt

    # 重新安装它们
    awk '{print $1}' /tmp/installed_packages.txt | xargs -r apt-get install --reinstall -y
    ```

8.  重新启动：
    ```bash
    reboot
    ```

##### 备用 Live USB 恢复方法：

如果恢复模式不起作用，您可以使用 live USB：

1.  从 live USB 启动（Ubuntu、Debian 或任何 Linux 发行版）

2.  找到您的系统分区：
    ```bash
    lsblk
    ```

3.  挂载您的系统分区：
    ```bash
    sudo mount /dev/sdXY /mnt  # 将 sdXY 替换为您的实际系统分区
    ```

4.  如果您有单独的引导分区，也请挂载它：
    ```bash
    sudo mount /dev/sdXZ /mnt/boot  # 如果需要
    ```

5.  Chroot 到您的系统：

    ```bash
    # 对于 Ubuntu/Debian：
    sudo chroot /mnt

    # 对于基于 Arch 的系统：
    sudo arch-chroot /mnt
    ```

6.  按照上面的 Ubuntu/Debian 恢复方法的步骤 6-8 操�������

恢复系统后，请按照上面的推荐解决方案设置用户可写的 npm 前缀。

## 自动更新程序问题

如果 Claude Code 无法自动更新，可能是由于您的 npm 全局前缀目录的权限问题。请按照推荐解决方案：创建用户可写的 npm 前缀来解决此问题。

如果您希望禁用自动更新程序，可以
将 `DISABLE_AUTOUPDATER` 环境变量设置为 `1`

## 权限和身份验证

### 重复的权限提示

如果您发现自己重复批准相同的命令，您可以使用 `/permissions` 命令允许特定工具
在未经批准的情况下运行。请参阅权限文档。

### 身份验证问题

如果您遇到身份验证问题：

1.  运行 `/logout` 完全注销
2.  关闭 Claude Code
3.  使用 `claude` 重新启动并再次完成身份验证过程

如果问题仍然存在，请尝试：

```bash
rm -rf ~/.config/claude-code/auth.json
claude
```

这将删除您存储的身份验证信息并强制进行干净的登录。

## 性能和稳定性

### CPU 或内存使用率高

Claude Code 旨在与大多数开发环境配合使用，但在处理大型代码库时可能会消耗大量资源。如果您遇到性能问题：

1.  定期使������� `/compact` 以减小上下文大小
2.  在主要任务之间关闭并重新���动 Claude Code
3.  �����������虑将大型构建目录添加到您的 `.gitignore` 文件中

### 命令挂起或冻结

如果 Claude Code 似乎没有响应：

1.  按 Ctrl+C 尝试取消当前操作
2.  如果没有响应，您可能需要关闭终端并重新启动

### ESC 键在 JetBrains (IntelliJ, PyCharm 等) 终端中不起作用

如果您在 JetBrains 终端中使用 Claude Code 并且 ESC 键未按预期中断代理，这可能是由于与 JetBrains 的默认快捷方式发生键绑定冲突。

要解决此问题：

1.  转到设置 → 工具 → 终端
2.  单击“覆盖 IDE 快捷方式”旁边的“配置终端键绑定”超链接
3.  在终端键绑定中，向下滚动到“将焦点切换到编辑器”并删除该快捷方式

这将允许 ESC 键正常用于取消 Claude Code 操作，而不是被 PyCharm 的“将焦点切换到编辑器”操作捕获。

## 获取更多帮助

如果您遇到的问题未在此处涵盖：

1.  在 Claude Code 中使用 `/bug` 命令直接向 Anthropic 报告问题
2.  查看 [GitHub 存储库](https://github.com/anthropics/claude-code)以了解已知问题
3.  运行 `/doctor` 检查您的 Claude Code 安装的健康状况
