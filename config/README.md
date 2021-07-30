# Project Config

| name | desc | type | default value | remark |
| --- | --- | --- | --- | --- |
| appId | project appId | string | `''` | - |
| port | devServer port | string |`8088` | 可多开，端口号自动 + 1（to do） |
| isMock | services mock mode | boolean |`false` | 设置为`true`时，重启项目并确保已提前准备好mock数据 |
| cdnEnv | env of support cdn | array | `['uat', 'pro']` | - |
| excludeEntries | ignore entries of local test for build prod mode | array | [] | - |
| [**dllCdnUrls**](dllCdnUrls.md) | urls of vendor  | object | - | - |
