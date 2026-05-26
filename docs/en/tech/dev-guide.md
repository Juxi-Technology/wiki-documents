
# Dev Guide

This guide introduces how to develop with Juxi Technology products.

## Development Environment Setup

### Install Dev Tools

```bash
# Install CLI tools
npm install -g @juxi/cli

# Initialize project
juxi init my-project
```

## Project Structure

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## Code Example

```javascript
import { Device } from '@juxi/sdk'

const device = new Device()
device.connect()
```
