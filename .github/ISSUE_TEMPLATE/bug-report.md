---
name: 文档问题 / Doc Issue
title: "[Doc] "
description: 报告文档错误、失效链接或内容缺失(Report document errors, broken links, or missing content)
labels: ["documentation"]
body:
  - type: markdown
    attributes:
      value: |
        ## 报告文档问题(中/英文均可)
        Thanks for helping improve the wiki!
  - type: input
    id: url
    attributes:
      label: 页面链接 / Page URL
      placeholder: https://wiki.juxitech.com/zh-hans/...
    validations:
      required: true
  - type: textarea
    id: issue
    attributes:
      label: 问题描述 / Issue
      description: 哪部分有误、失效链接具体位置或缺失内容
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: 期望内容 / Expected
      description: 你认为应该是什么(如有)
