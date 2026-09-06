---
name: 内容建议 / Content Request
title: "[Content] "
description: 提议新增教程、专题或改进文档结构(Propose new tutorials, topics, or structure changes)
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        ## 内容建议(中/英文均可)
        我们欢迎社区贡献,详见[贡献指南](https://wiki.juxitech.com/community/contributing)。
  - type: input
    id: title
    attributes:
      label: 建议主题 / Suggested Topic
    validations:
      required: true
  - type: dropdown
    id: type
    attributes:
      label: 类型 / Type
      options:
        - 新教程 / New Tutorial
        - 新专题 / New Topic Series
        - 文档改进 / Documentation Improvement
        - 翻译补充 / Translation
    validations:
      required: true
  - type: textarea
    id: detail
    attributes:
      label: 详情 / Details
      description: 面向哪些读者、涉及哪些产品/软硬件、期望覆盖的内容
    validations:
      required: true
